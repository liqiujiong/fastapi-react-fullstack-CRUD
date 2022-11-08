from typing import List, Optional, Union

from pydantic import BaseModel


# Shared properties
class ProjectBase(BaseModel):
    pass
    # user_id: Optional[int] = None

# Properties to receive on item creation
class ProjectCreate(ProjectBase):
    name: str = None
    description: str = None
    req: int = None
    hour: int = None
    image: str = None
    lib_url: str = None
    status: int = None
    tender_time: int = None
    result_time: int = None

    tag: List[str] = []


class ProjectUpdate(ProjectBase):
    id: int
    name: Optional[str] = None
    description: Optional[str] = None
    req: Optional[int] = None
    hour: Optional[int] = None
    image: Optional[str] = None
    lib_url: Optional[str] = None
    tender_time: Optional[int] = None
    result_time: Optional[int] = None

    tag: List[str] = []


# Properties to return to client
class Project(ProjectBase):
    id: int

    class Config:
        orm_mode = True


# Shared properties
class ProjectTenderBase(BaseModel):
    project_id: int = None
    # status: int = None


# Properties to receive on item creation
class ProjectTenderCreate(ProjectTenderBase):
    pass

class ProjectTenderUpdate(ProjectTenderBase):
    user_id: int = None
    pass


# Properties to return to client
class ProjectTender(ProjectTenderBase):
    id: int

    class Config:
        orm_mode = True


# Shared properties
class ProjectWorkBase(BaseModel):
    pass

# Properties to receive on item creation
class ProjectWorkCreate(ProjectWorkBase):
    project_id: int = None
    work_url: str = None


class ProjectWorkUpdate(ProjectWorkBase):
    pass


# Properties to return to client
class ProjectWork(ProjectWorkBase):
    id: int

    class Config:
        orm_mode = True

class ProjectWorkReject(ProjectWorkBase):
    project_id: int = None
    reason: str = None


class ProjectWorkSolve(ProjectWorkBase):
    project_id: int = None
    score: int = None


# Shared properties
class ProjectTagBase(BaseModel):
    project_id: Optional[int] = None
    name: Optional[str] = None

# Properties to receive on item creation
class ProjectTagCreate(ProjectTagBase):
    pass


class ProjectTagUpdate(ProjectTagBase):
    pass


# Properties to return to client
class ProjectTag(ProjectTagBase):
    id: int

    class Config:
        orm_mode = True