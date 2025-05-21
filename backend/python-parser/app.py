from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.chains import RetrievalQA
import tempfile

app = FastAPI()

# Optional: Allow frontend to talk to FastAPI directly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/parse")
async def parse_pdf(file: UploadFile, limit: int = Form(5)):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(await file.read())
        tmp.flush()
        loader = PyPDFLoader(tmp.name)
        docs = loader.load()

    chunks = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50).split_documents(docs)
    db = FAISS.from_documents(chunks, OpenAIEmbeddings())
    qa = RetrievalQA.from_chain_type(llm=ChatOpenAI(model="gpt-4"), retriever=db.as_retriever())

    question = f"Extract the top {limit} most important structured data points (such as monetary values, IDs, and dates) from this document."
    result = qa.invoke({"query": question})
    return {"answer": result["result"]}
