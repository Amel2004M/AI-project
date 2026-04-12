import os

from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_ollama import OllamaEmbeddings, ChatOllama

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough


# CONFIG
MODEL_NAME = "llama3"
DATA_PATH = "./data"
VECTOR_DB_PATH = "./chroma_db"


# LOAD DOCUMENTS
def load_documents():
    documents = []

    for file in os.listdir(DATA_PATH):
        path = os.path.join(DATA_PATH, file)

        if file.endswith(".pdf"):
            documents.extend(PyPDFLoader(path).load())

        elif file.endswith(".txt"):
            documents.extend(TextLoader(path, encoding="utf-8").load())

    return documents


# FORMAT DOCS
def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)


def main():

    print("1. Chargement...")
    docs = load_documents()

    print("2. Chunking...")
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    chunks = splitter.split_documents(docs)

    print("3. Embeddings...")
    embeddings = OllamaEmbeddings(model=MODEL_NAME)

    db = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=VECTOR_DB_PATH
    )

    retriever = db.as_retriever()

    print("4. LLM...")
    llm = ChatOllama(model=MODEL_NAME, temperature=0)

    print("5. Pipeline RAG...")

    #  PROMPT AMÉLIORÉ (anti-générique)
    prompt = ChatPromptTemplate.from_template("""
You are a senior AI research scientist.

TASK:
Write a precise technical paragraph summarizing the context.

RULES:
- Do NOT copy or paraphrase sentence-by-sentence
- Identify the MAIN IDEA first
- All other ideas must support the main idea
- Avoid generic explanations
- Focus on WHY and HOW, not definitions
- Remove any redundancy completely

OUTPUT:
- One single paragraph only
- Maximum 8–10 lines
- Highly informative and technical

Context:
{context}

Question:
{question}
""")

    chain = (
        {
            "context": retriever | format_docs,
            "question": RunnablePassthrough()
        }
        | prompt
        | llm
    )

    print("6. Question...")

    query = "Write a technical synthesis of the document in a clear paragraph format."

    response = chain.invoke(query)

    print("\nRESULT:\n")
    print(response.content)


if __name__ == "__main__":
    main()