# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import uuid

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Models
class TaskBase(BaseModel):
    title: str
    description: str
    dueDate: datetime
    priority: str  # 'low' | 'medium' | 'high'
    status: str    # 'todo' | 'in-progress' | 'completed'
    category: Optional[str] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    dueDate: Optional[datetime] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    category: Optional[str] = None

class Task(TaskBase):
    id: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True

# In-memory storage (replace with database)
tasks: List[Task] = []

@app.get("/api/tasks", response_model=List[Task])
async def get_tasks():
    return tasks

@app.post("/api/tasks", response_model=Task)
async def create_task(task: TaskCreate):
    new_task = Task(
        **task.dict(),
        id=str(uuid.uuid4()),
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    tasks.append(new_task)
    return new_task

@app.patch("/api/tasks/{task_id}", response_model=Task)
async def update_task(task_id: str, task_update: TaskUpdate):
    task_idx = next((i for i, t in enumerate(tasks) if t.id == task_id), None)
    if task_idx is None:
        raise HTTPException(status_code=404, detail="Task not found")
    
    update_data = task_update.dict(exclude_unset=True)
    task_data = tasks[task_idx].dict()
    task_data.update(update_data)
    task_data["updatedAt"] = datetime.now()
    
    updated_task = Task(**task_data)
    tasks[task_idx] = updated_task
    return updated_task

@app.patch("/api/tasks/{task_id}/status", response_model=Task)
async def update_task_status(task_id: str, status: str):
    task_idx = next((i for i, t in enumerate(tasks) if t.id == task_id), None)
    if task_idx is None:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task_data = tasks[task_idx].dict()
    task_data["status"] = status
    task_data["updatedAt"] = datetime.now()
    
    updated_task = Task(**task_data)
    tasks[task_idx] = updated_task
    return updated_task

@app.delete("/api/tasks/{task_id}")
async def delete_task(task_id: str):
    task_idx = next((i for i, t in enumerate(tasks) if t.id == task_id), None)
    if task_idx is None:
        raise HTTPException(status_code=404, detail="Task not found")
    
    tasks.pop(task_idx)
    return {"status": "success"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


# To run:

# Install FastAPI: pip install fastapi uvicorn
# Run backend: uvicorn main:app --reload
# Run frontend: npm run dev