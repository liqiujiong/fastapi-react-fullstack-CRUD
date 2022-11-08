// eslint-disable-next-line no-unused-vars
declare namespace API {
  // new
  export type Response<T = any> = {
    data: T;
    /** 业务上的请求是否成功 */
    success: boolean;
    /** 业务约定的错误码 */
    errorCode?: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
  };

  export interface UserList {
    pageSize: number;
    total: number;
    current: number;
    list: UserData[];
  }

  export type UserListRes = Response<UserList>;

  type RoleData = {
    id: number;
    name: string;
    title: string;
    user_counts: number;
  };
  export type RoleListRes = Response<RoleData[]>;

  export interface ApiItem {
    key: number;
    path: string;
    title: string;
    method: string;
  }

  export interface GroupItem {
    key: string;
    title: string;
    children: ApiItem[];
  }

  export type ApiRes = Response<GroupItem[]>;

  export interface MenuItem {
    key: number;
    title: string; // 主菜单名称（中文）
    children: { key: string; title: string }[];
  }
  export type MenuRes = Response<MenuItem[]>;

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  export interface UserListReq {
    pageSize: number;
    current: number;
    role?: number[];
    poslevel?: string[];
    name?: string;
    block?: number; // 不填全部，0返回没有block，1返回block
  }
  export interface UserData {
    id: number;
    name: string;
    dingding_user_id: string;
    prolevel: { id: number; title: string; level: string };
    role: { id: number; name: string; title: string }[];
    department: { id: number; name: string };
    is_block: boolean;
  }

  // old

  type CurrentUser = {
    email?: string;
    nickname?: string;
    update_time?: number;
    create_time?: any;
    coin?: number;
    cash?: number;
    id_card?: string;
    wechat?: string;
    school?: string;
    password?: string;
    id?: number;
    is_block?: boolean;
    cash_extract?: number;
    pay_account?: string;
    real_name?: string;
    phone?: string;
  };

  type LoginResult = Response<
    {
      token: string;
    } & CurrentUser
  >;

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    phone?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  // // workflow =============

  // export enum statusCode {
  //   200 = '服务器成功返回请求的数据。',
  //   400 = '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  //   401 = '用户没有权限（令牌、用户名、密码错误）。',
  //   403 = '用户得到授权，但是访问是被禁止的。',
  //   404 = '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  //   500 = '服务器发生错误，请检查服务器。',
  //   502 = '网关错误。',
  //   503 = '服务不可用，服务器暂时过载或维护。',
  //   504 = '网关超时。',
  // }
  // export interface CommonRes {
  //   status: string;
  //   reason: string;
  // }

  // export interface DownRes {
  //   status: string;
  //   reason: string;
  //   result: {
  //     url: string;
  //   };
  // }

  // export interface CurrentUser {
  //   avatar?: string;
  //   name?: string;
  //   title?: string;
  //   group?: string;
  //   signature?: string;
  //   tags?: {
  //     key: string;
  //     label: string;
  //   }[];
  //   userid?: string;
  //   access?: 'user' | 'guest' | 'admin';
  //   unreadCount?: number;
  // }

  // /**
  //  * 钉钉登录
  //  */

  // export interface DingdingRedirectUrlResponse {
  //   result: {
  //     app_id: string;
  //     redirect_uri: string;
  //   };
  //   status: string;
  //   reason?: string;
  // }
  // export interface DingdingOauthLoginRequest {
  //   code: string;
  // }
  // export interface DingdingOauthLoginResponse {
  //   result: {
  //     name: string;
  //     avatar: string;
  //     jwt: string;
  //     jwt_exp: string;
  //   };
  //   status: string;
  //   reason?: string;
  // }

  // // 项目类型
  // export interface ProjectType {
  //   type_id: string;
  //   type_name: string;
  // }
  // // 项目类型返回值
  // export interface ProjectTypeRes {
  //   result: ProjectType[];
  //   status: string;
  //   reason?: string;
  // }

  // export interface ProjectAllStageRes {
  //   result: string[];
  //   status: string;
  //   reason?: string;
  // }

  // // 用户
  // export interface User {
  //   id: number;
  //   user_id: string;
  //   user_name: string;
  //   avatar: string;
  //   mobile: string;
  //   job_number: string; // 工号
  //   position: {
  //     daily_salary: number; // 日薪
  //     id: number;
  //     position_level: string;
  //     title: string; // 职级名称
  //   };
  //   title: string;
  //   is_on_job: number; // 是否在职， 1-在职 0-不在职
  // }

  // // 所有用户返回值
  // export interface UsersRes {
  //   result: User[];
  //   status: string;
  //   reason?: string;
  // }

  // // 部门
  // export interface Departments {
  //   id: number;
  //   dingding_department_id: string;
  //   name: string;
  // }
  // // 所有部门返回值
  // export interface DepartmentsRes {
  //   result: Departments[];
  //   status: string;
  //   reason?: string;
  // }

  // // 创建项目body
  // export interface ProjectReq {
  //   project_name: string;
  //   project_type_id: number;
  //   manager_id: number;
  //   department_id: number;
  //   customer_id: number;
  //   start_date: string;
  //   finish_date: string;
  //   amount: number;
  //   budget: number;
  //   project_id?: number;
  // }
  // // 创建项目返回值
  // export interface PostRes {
  //   result: {
  //     id: number;
  //   };
  //   status: string;
  //   reason?: string;
  // }

  // // 搜索项目body
  // export interface SearchProjectReq {
  //   project_name: ''; // 项目名称（中文）
  //   is_exact_match: true; // 是否精确匹配（默认为false）
  // }

  // // 搜索项目返回
  // export interface SearchRes {
  //   result: {
  //     id: number;
  //     name: string;
  //   }[];
  //   status: string;
  //   reason?: string;
  // }

  // // 所有客户
  // export interface CustomerRes {
  //   result: {
  //     id: number;
  //     name: string;
  //   }[];
  //   status: string;
  //   reason?: string;
  // }

  // export interface ProjectItem {
  //   id: number;
  //   project_code: string; // 项目编号
  //   name: string; // 项目名称
  //   type: {
  //     id: number; // 项目类型id
  //     name: string; // 项目类型名称
  //   };
  //   department: {
  //     id: number; // 执行部门id
  //     name: string; // 执行部门名称
  //   };
  //   start_date: string; // 开始日期
  //   finish_date: string; // 结束日期
  //   status: {
  //     id: number; // 状态id
  //     name: string; // 状态名称
  //   };
  //   current_stage: {
  //     id: number; // 阶段id
  //     name: string; // 阶段名称
  //   };
  //   amount: number; // 项目金额
  //   budget: number; // 项目预算
  // }
  // export interface ListPageModel<T> {
  //   result: ListPageRes<T>;
  //   status: string;
  //   reason?: string;
  // }

  // export interface ListPageRes<T> {
  //   pageSize: number; // 每页条目数
  //   total: number; // 总条目数
  //   current: number; // 当前页面
  //   list: any[][];
  // }

  // export type ProjectListRes = ListPageModel<ProjectItem>;

  // export interface ProjectListReq {
  //   sort_order: 'create_time_desc' | 'create_time_asc';
  //   pageSize: number;
  //   current: number;
  //   project_type: number[];
  //   department: number[];
  //   manager: number[];
  // }

  // export interface ProjectRoleItem {
  //   id: number;
  //   title: string; // 项目成员中文名称
  //   name: string; // 项目成员英文名称
  // }
  // export interface ProjectRolesRes {
  //   result: ProjectRoleItem[];
  //   status: string;
  //   reason?: string;
  // }
  // export interface ProjectDetail {
  //   id: number;
  //   project_code: string; // 项目编号
  //   name: string; // 项目名称
  //   type: {
  //     id: number; // 项目类型id
  //     name: string; // 项目类型名称
  //   };
  //   department: {
  //     id: number; // 执行部门id
  //     name: string; // 执行部门名称
  //   };
  //   manager: {
  //     id: number; // 项目经理id
  //     username: string; // 项目经理名称
  //   };
  //   start_date: string; // 开始日期
  //   finish_date: string; // 结束日期
  //   status: {
  //     id: number; // 状态id
  //     name: string; // 状态名称
  //   };
  //   current_stage: {
  //     id: number; // 阶段id
  //     name: string; // 阶段名称
  //   };
  //   amount: number; // 项目金额
  //   budget: number; // 项目预算
  //   customer: {
  //     id: number;
  //     name: string;
  //   };
  // }

  // export interface ProjectDetailRes {
  //   result: ProjectDetail;
  //   status: string;
  //   reason?: string;
  // }

  // export interface ProjectMemberItem {
  //   id?: number; // 项目成员唯一标识（用于table的key）
  //   member_id?: number | string; // 项目成员id
  //   member_username?: string; // 项目成员名称
  //   member_role_id?: number | string; // 成员角色id
  //   member_role_name?: string; // 成员角色名称
  //   time_spent: number; // 在项目时长（工时）
  //   is_block: boolean; // true: 表示被屏蔽（不在项目）， false: 表示未被屏蔽（在项目）
  //   shortid?: string;
  //   is_project_manager?: boolean; // 是否是项目经理
  //   roles: number[];
  //   key?: string;
  // }

  // export interface ProjectMemberRes {
  //   result: ProjectMemberItem[];
  //   status: string;
  //   reason?: string;
  // }

  // export interface AddProjectMemberReq {
  //   project_id: number;
  //   user_id: number; // 用户id
  //   member_role_id: number; // 成员角色id
  // }

  // export interface AddProjectMemberRes {
  //   id: number; // 项目成员唯一标识（用于table的key）
  //   member: {
  //     id: number; // 成员id
  //     username: string; // 成员名称
  //   };
  //   member_role: {
  //     id: number; // 成员角色id
  //     name: string; // 成员名称
  //   };
  //   time_spent: number; // 在项目时长（工时）
  //   status: string; // 在项目状态
  // }

  // export interface ManagerListRes {
  //   result: { id: number; name: string }[];
  //   status: string;
  //   reason?: string;
  // }
  // export interface ChangeProjectMemberAttrRes {
  //   result: ProjectMemberItem;
  //   status: string;
  //   reason?: string;
  // }
  // export enum ProjectStage {
  //   // eslint-disable-next-line no-unused-vars
  //   Wait = 'wait',
  //   // eslint-disable-next-line no-unused-vars
  //   Process = 'process',
  //   // eslint-disable-next-line no-unused-vars
  //   Finish = 'finish',
  // }
  // export interface StageItem {
  //   id: number;
  //   name: string;
  //   // 0未开始 1进行中 2完成
  //   stage_state: ProjectStage;
  // }
  // export interface ProjectStageRes {
  //   result: StageItem[];
  //   status: string;
  //   reason?: string;
  // }
  // //  任务类型：0线下1审批2文件3表单
  // export enum StageTask {
  //   // eslint-disable-next-line no-unused-vars
  //   OffLine,
  //   // eslint-disable-next-line no-unused-vars
  //   Approve,
  //   // eslint-disable-next-line no-unused-vars
  //   File,
  //   // eslint-disable-next-line no-unused-vars
  //   Form,
  // }
  // // 任务状态0未完成1审批中/续传文件2完成
  // export enum TaskState {
  //   // eslint-disable-next-line no-unused-vars
  //   NotDone,
  //   // eslint-disable-next-line no-unused-vars
  //   Approving,
  //   // eslint-disable-next-line no-unused-vars
  //   UploadingFile,
  //   // eslint-disable-next-line no-unused-vars
  //   Done,
  // }
  // export interface ProjectStageTask {
  //   task_id: number;
  //   task_name: string;
  //   task_desc: string;
  //   task_type: StageTask;
  //   task_state: TaskState;
  //   task_necessary: number; //  是否必做0否1是
  //   stage_id: number;
  //   task_values: ApproveTaskValue | FileTaskValue | undefined;
  //   task_define: {
  //     multi: boolean;
  //     name: string;
  //     types: string[];
  //   };
  // }

  // export interface ApproveTaskValue {
  //   type: string;
  //   payload: {
  //     processinstance_id: string;
  //   };
  // }

  // export interface FileTaskValue {
  //   type: string;
  //   payload: {
  //     files: {
  //       type: 'oss_file' | 'local_file';
  //       payload: {
  //         name: string;
  //         path: string;
  //         url?: string; // 文件下载地址
  //       };
  //     }[];
  //   };
  // }

  // export interface ProjectStageTaskRes {
  //   result: ProjectStageTask[];
  //   status: string;
  //   reason?: string;
  // }

  // export interface TaskApproveReq {
  //   task_id: number;
  //   project_id?: number;
  //   form: {
  //     content: string; // 点”发起审批“用户输入审批内容，按确认后发起，最终会展示在申请审批中
  //     project_code: string; // 项目编号
  //     name: string; // 项目名称
  //     type: string; // 项目类型名称
  //     department: string; // 执行部门名称
  //     manager: string; // 项目经理名称
  //     customer: string; // 客户名称
  //     current_stage: string; // 阶段名称
  //     amount: number; // 项目金额
  //     budget: number; // 项目预算
  //   };
  // }
  // // osstoken详情
  // export interface OssTokenDetail {
  //   accessid: string;
  //   callback: string;
  //   dir: string;
  //   expire: string;
  //   host: string;
  //   policy: string;
  //   signature: string;
  // }

  // export interface OssTokenRes {
  //   result: OssTokenDetail;
  //   status: string;
  //   reason?: string;
  // }

  // export interface OssUploadReq {
  //   project_id: number;
  //   key: string;
  //   task_id: number;
  //   files: {
  //     type: string; // 文件类型 path / file
  //     value: string;
  //   }[];
  // }
  // export interface ProjectDoc {
  //   id: number;
  //   name: string;
  //   count: number;
  //   files: {
  //     payload: {
  //       name: string;
  //       path: string;
  //       uid: string;
  //       url: string;
  //     };
  //     type: 'oss_file' | 'local_file';
  //   }[];
  // }

  // export interface ProjectDocRes {
  //   result: ProjectDoc[];
  //   status: string;
  //   reason?: string;
  // }
  // export interface ProjectGoal {
  //   id: number;
  //   user_name: string;
  //   create_time: string;
  //   content: string;
  // }

  // export interface ProjectGoalRes {
  //   result: ProjectGoal[];
  //   status: string;
  //   reason?: string;
  // }

  // export interface ProjectFollowup {
  //   id: number;
  //   user_name: string;
  //   date: string;
  //   content: string;
  //   key?: number;
  // }

  // export interface ProjectFollowupRes {
  //   result: ProjectFollowup[];
  //   status: string;
  //   reason?: string;
  // }

  // export interface ProjectQuality {
  //   id: number;
  //   doc_title: string; // 文件名称
  //   doc_path: string; // 文件路径
  //   create_by: string; // 创建用户id
  //   create_time: string; // 创建时间，返回字符串格式(YYYY-MM-DD hh:mm:ss)
  //   update_by: string; // 更新用户id
  //   update_time: string; // 更新时间，返回字符串格式YYYY-MM-DD hh:mm:ss
  //   key?: string;
  // }

  // export interface ProjectQualityRes {
  //   result: ProjectQuality[];
  //   status: string;
  //   reason?: string;
  // }

  // export interface UserDeleteReq {
  //   user_id: number;
  // }

  // export interface PoslevelsData {
  //   id: number;
  //   title: string;
  //   level: string;
  // }

  // export interface UserPoslevelsRes {
  //   status: 'ok' | 'error';
  //   reason: string;
  //   result: PoslevelsData[];
  // }

  // export interface UserRoleData {
  //   id: number;
  //   name: string;
  //   title: string;
  //   user_counts: number;
  // }
  // export interface UserRoleListRes {
  //   status: string;
  //   reason: string;
  //   result: UserRoleData[];
  // }

  // export interface ContractListReq {
  //   sort_order: 'create_time_desc' | 'create_time_asc';
  //   pageSize: number;
  //   current: number;
  //   type: number[];
  //   department: number[];
  //   manager: number[];
  //   keyword?: string;
  //   executive_condition: string[];
  //   acceptance_status: string[];
  //   customer: string[];
  // }

  // export interface ContractItem {
  //   id: number;
  //   contract_code: string; // 合同编号
  //   name: string; // 合同名称
  //   type: {
  //     id: number; // 合同类型id
  //     type_name: string; // 项目类型名称
  //   };
  //   department: {
  //     id: number; // 执行部门id
  //     department_name: string; // 执行部门名称
  //   };
  //   manager: {
  //     id: number; // 项目经理id
  //     username: string; // 项目经理名称
  //   };
  //   customer: {
  //     id: number; // 甲方客户id
  //     username: string; // 甲方客户名称
  //   };
  //   sales_model: {
  //     id: number; // 销售模式 id
  //     model_name: string; // 销售模式名称
  //   };
  //   start_date: string; // 开始日期
  //   finish_date: string; // 结束日期
  //   signing_date: string; // 签约日期
  //   executive_condition: {
  //     id: number; // 执行情况id
  //     exe_name: string; // 执行情况名称
  //   };
  //   acceptance_status: {
  //     id: number; // 验收状态id
  //     acp_name: string; // 验收状态名称
  //   };
  //   is_stamp_duty_commit: number; // 印花税
  //   amount: number; // 合同金额，单位万元
  //   note: string; // 备注
  //   doc_type: number; // 文件类型
  //   doc_content: string; // 文件内容
  //   create_time: number; // 时间戳 秒
  //   update_time: number; // 时间戳 秒
  //   create_by: {
  //     id: number; // 创建人id
  //     username: string; // 创建人名称
  //   };
  //   update_by: {
  //     id: number; // 修改人id
  //     username: string; // 创建人名称
  //   };
  // }

  // export type ContractListRes = ListPageModel<ContractItem>;

  // // 创建合同body
  // export interface ContractReq {
  //   name: string;
  //   type: number;
  //   manager_id: number;
  //   department_id: number;
  //   customer_id: number;
  //   amount: number;
  //   sales_model: number;
  //   executive_condition: number;
  //   acceptance_status: number;
  //   is_stamp_duty_commit: number;
  //   note: string;
  //   start_date: string;
  //   finish_date: string;
  //   signing_date: string;
  //   contract_id?: string;
  // }

  // export interface DictType {
  //   label: string;
  //   value: string;
  // }

  // export interface TypeDictRes {
  //   status: string;
  //   reason: string;
  //   result: DictType[];
  // }
  // // 搜索合同body
  // export interface SearchContractReq {
  //   contract_name: ''; // 合同名称（中文）
  //   is_exact_match: true; // 是否精确匹配（默认为false）
  // }

  // export interface ContractDetail {
  //   id: number;
  //   contract_code: string; // 合同编号
  //   name: string; // 合同名称
  //   type: {
  //     id: number; // 合同类型id
  //     type_name: string; // 项目类型名称
  //   };
  //   department: {
  //     id: number; // 执行部门id
  //     department_name: string; // 执行部门名称
  //   };
  //   manager: {
  //     id: number; // 项目经理id
  //     username: string; // 项目经理名称
  //   };
  //   supplier?: {
  //     id: number; // 供应商id
  //     username: string; // 供应商名称
  //   };
  //   customer?: {
  //     id: number; // 甲方客户id
  //     username: string; // 甲方客户名称
  //   };
  //   sales_model: {
  //     id: number; // 销售模式 id
  //     model_name: string; // 销售模式名称
  //   };
  //   start_date: string; // 开始日期
  //   finish_date: string; // 结束日期
  //   signing_date: string; // 签约日期
  //   executive_condition: {
  //     id: number; // 执行情况id
  //     exe_name: string; // 执行情况名称
  //   };
  //   acceptance_status: {
  //     id: number; // 验收状态id
  //     acp_name: string; // 验收状态名称
  //   };
  //   is_stamp_duty_commit: number; // 印花税
  //   amount: number; // 合同金额，单位万元
  //   note: string; // 备注
  //   doc_type: number; // 文件类型
  //   doc_content: string; // 文件内容
  //   create_time: number; // 时间戳 秒
  //   update_time: number; // 时间戳 秒
  //   receivable_amount?: number; // 回款金额
  //   payed_amount?: number; // 已付款金额
  // }

  // export interface ContractDetailRes {
  //   result: ContractDetail;
  //   status: string;
  //   reason?: string;
  // }

  // export interface CashflowReceiptItem {
  //   id: number;
  //   contract_id: number; // 合同id
  //   invoice_amount: number; // 开票金额
  //   receivable_amount: number; // 回款金额
  //   invoiced_for_pay: number; // 已开票待回款
  //   contract_arrears: number; // 合同欠款
  //   payment_progress: number; // 付款进度
  //   follow_up_date: string; // 跟进日期
  //   create_by: number; // 创建用户id
  //   create_time: number; // 创建时间，返回字符串格式(YYYY-MM-DD hh:mm:ss)
  //   update_by: number; // 更新用户id
  //   update_time: number; // 更新时间，返回字符串格式YYYY-MM-DD hh:mm:ss
  //   key?: number | string;
  // }

  // export interface CashflowReceiptRes {
  //   result: CashflowReceiptItem[];
  //   status: string;
  //   reason?: string;
  // }

  // export interface CashflowReceiptReq {
  //   contract_id: number; // 合同id
  //   invoice_amount: number; // 开票金额
  //   receivable_amount: number; // 回款金额
  //   invoiced_for_pay: number; // 已开票待回款
  //   contract_arrears: number; // 合同欠款
  //   payment_progress: number; // 付款进度
  //   follow_up_date: string; // 跟进日期
  //   id?: number;
  // }

  // export interface DeliverItem {
  //   id: number;
  //   contract_id: number; // 合同id
  //   delivery_date: string; // 交付节点（日期）
  //   delivery_content: string; // 合同约定交付内容
  //   readiness: string; // 准备情况
  //   create_by: number; // 创建用户id
  //   create_time: number; // 创建时间，返回字符串格式(YYYY-MM-DD hh:mm:ss)
  //   update_by: number; // 更新用户id
  //   update_time: number; // 更新时间，返回字符串格式YYYY-MM-DD hh:mm:ss
  //   key?: number | string;
  // }

  // export interface DeliverRes {
  //   result: DeliverItem[];
  //   status: string;
  //   reason?: string;
  // }

  // export interface DeliverReq {
  //   contract_id: number; // 合同id
  //   delivery_date: string; // 交付节点（日期）
  //   delivery_content: string; // 合同约定交付内容
  //   readiness: string; // 准备情况
  //   id?: number;
  // }

  // export interface ClauseItem {
  //   id: number;
  //   contract_id: number; // 合同id
  //   core_clause: string; // 核心条款
  //   contract_content: string; // 合同内容
  //   create_by: number; // 创建用户id
  //   create_time: number; // 创建时间，返回字符串格式(YYYY-MM-DD hh:mm:ss)
  //   update_by: number; // 更新用户id
  //   update_time: number; // 更新时间，返回字符串格式YYYY-MM-DD hh:mm:ss
  //   key?: number | string;
  // }

  // export interface ClauseRes {
  //   result: ClauseItem[];
  //   status: string;
  //   reason?: string;
  // }

  // export interface ClauseReq {
  //   contract_id: number; // 合同id
  //   core_clause: string; // 核心条款
  //   contract_content: string; // 合同内容
  //   id?: number;
  // }

  // export interface IncomeInvoiceItem {
  //   id: number;
  //   name: string; // 文件名称
  //   type: 1; // 类型(1-oss文件 2-本地文件)
  //   path: string; // 文件地址
  //   related_id?: number; // 关联合同表主键id
  //   related_type?: number; // 关联合同表类型（1-销售合同主键id 2-销售合同确认上传表主键id）
  // }
  // export interface IncomeItem {
  //   id: number;
  //   contract_id: number; // 合同id
  //   confirm_date: number; // 确收时间
  //   confirm_amount: number; // 确收金额
  //   confirm_basis: number; // 确收依据
  //   invoice_type: number; // 验收函/发票类型（1-oss地址，2-存放位置）
  //   invoice_content: number; // 验收函/发票内容
  //   invoice: ContractAttachmentItem[];
  //   create_by: number; // 创建用户id
  //   create_time: number; // 创建时间，返回字符串格式(YYYY-MM-DD hh:mm:ss)
  //   update_by: number; // 更新用户id
  //   update_time: number; // 更新时间，返回字符串格式YYYY-MM-DD hh:mm:ss
  //   key?: number | string;
  // }

  // export interface IncomeRes {
  //   result: IncomeItem[];
  //   status: string;
  //   reason?: string;
  // }

  // export interface IncomeReq {
  //   contract_id: number; // 合同id
  //   confirm_date: string; // 确收时间
  //   confirm_amount: number; // 确收金额
  //   confirm_basis: number; // 确收依据
  //   id?: number;
  // }

  // export interface CreateContractAttachmentReq {
  //   related_id: number;
  //   related_type: string;
  //   file_list: {
  //     related_id: number;
  //     related_type: number;
  //     name: string;
  //     type: number;
  //     uid: string;
  //     path: string;
  //   }[];
  // }

  // export interface ModifyContractAttachmentReq {
  //   name: string; // 文件名称
  //   type: string; // 类型(1-oss文件 2-本地文件)
  //   path: string; // 文件地址
  //   related_id: number; // 关联合同表主键id
  //   related_type: string; // 关联合同表类型（1-销售合同主键id 2-销售合同确认上传表主键id）
  //   id?: number;
  // }

  // export interface ContractAttachmentItem {
  //   id: number;
  //   name: string; // 文件名称
  //   type: number; // 类型(1-oss文件 2-本地文件)
  //   path: string; // 文件地址
  //   uid: string;
  //   related_id?: number; // 关联合同表主键id
  //   related_type?: string; // 关联合同表类型（1-销售合同主键id 2-销售合同确认上传表主键id）
  //   create_by?: number; // 创建用户id
  //   create_time?: number; // 创建时间，返回字符串格式(YYYY-MM-DD hh:mm:ss)
  //   update_by?: number; // 更新用户id
  //   update_time?: number; // 更新时间，返回字符串格式YYYY-MM-DD hh:mm:ss
  //   url?: string;
  // }

  // export interface ContractAttachmentListRes {
  //   result: ContractAttachmentItem[];
  //   status: string;
  //   reason?: string;
  // }

  // export interface ContractMemberRoleItem {
  //   id: number;
  //   title: string; // 项目成员中文名称
  //   name: string; // 项目成员英文名称
  // }

  // export interface ContractMemberRoleRes {
  //   result: ContractMemberRoleItem[];
  //   status: string;
  //   reason?: string;
  // }

  // export interface CreateModifySaleContractMemReq {
  //   contract_id: number; // 合同iD
  //   user_id: number; // 用户iD
  //   contract_role_id: number[]; // (合同成员字典表iD)
  // }
  // export interface SaleContractMemItem {
  //   member_id: string | number; // 合同成员id（用户iD）
  //   member_username: string; // 项目成员名称
  //   roles: number[];
  //   is_contract_manager?: boolean;
  //   avatar?: string;
  //   shortid?: string;
  //   member_username?: string;
  //   key?: string;
  // }

  // export interface SaleContractMemRes {
  //   result: SaleContractMemItem[];
  //   status: string;
  //   reason?: string;
  // }

  // export interface PaymentItem {
  //   id: number;
  //   contract_id: number; // 合同id
  //   payment_date: string; // 付款日期
  //   invoice_amount: number; // 收到发票金额
  //   paid_amount: number; // 已付金额
  //   contract_arrears: number; // 合同欠款
  //   invoice: {
  //     id: number;
  //     name: string; // 文件名称
  //     type: number | string; // 类型(1-oss文件 2-本地文件)
  //     path: string; // 文件地址
  //     related_id: number; // 关联合同表主键id
  //     related_type: number | string; // 关联合同表类型（1-销售合同主键id 2-销售合同确认上传表主键id）
  //   }[];
  //   create_by: number; // 创建用户id
  //   create_time: number; // 创建时间，返回字符串格式(YYYY-MM-DD hh:mm:ss)
  //   update_by: number; // 更新用户id
  //   update_time: number; // 更新时间，返回字符串格式YYYY-MM-DD hh:mm:ss
  //   key?: number;
  // }

  // export interface PaymentRes {
  //   result: PaymentItem[];
  //   status: string;
  //   reason?: string;
  // }

  // export interface PaymentReq {
  //   contract_id: number; // 合同id
  //   payment_date: string; // 付款日期
  //   invoice_amount: number; // 收到发票金额
  //   paid_amount: number; // 已付金额
  //   contratc_arrears: number; // 合同欠款
  //   id?: number;
  // }

  // export interface ProjectSaleItem {
  //   id: number;
  //   project_id: number; // 项目id
  //   contract_id: number; // 销售合同id
  //   amount: number; // 合同所属金额
  //   contract_name: string; // 销售合同名称
  //   customer: string; // 甲方客户
  //   create_by: number; // 创建用户id
  //   create_time: number; // 创建时间，返回字符串格式(YYYY-MM-DD hh:mm:ss)
  //   update_by: number; // 更新用户id
  //   update_time: number; // 更新时间，返回字符串格式YYYY-MM-DD hh:mm:ss
  //   key?: number | string;
  // }

  // export interface ProjectSaleRes {
  //   result: ProjectSaleItem[];
  //   status: string;
  //   reason?: string;
  // }

  // export interface ProjectPayItem {
  //   id: number;
  //   project_id: number; // 项目id
  //   contract_id: number; // 付款合同id
  //   amount: number; // 合同所属金额
  //   contract_name: string; // 付款合同名称
  //   supplier: string; // 供应商
  //   create_by: number; // 创建用户id
  //   create_time: number; // 创建时间，返回字符串格式(YYYY-MM-DD hh:mm:ss)
  //   update_by: number; // 更新用户id
  //   update_time: number; // 更新时间，返回字符串格式YYYY-MM-DD hh:mm:ss
  //   key?: number | string;
  // }

  // export interface ProjectPayRes {
  //   result: ProjectPayItem[];
  //   status: string;
  //   reason?: string;
  // }

  // export interface ApiItem {
  //   key: number;
  //   path: string;
  //   title: string;
  //   method: string;
  // }

  // export interface GroupItem {
  //   key: string;
  //   title: string;
  //   children: ApiItem[];
  // }

  // export interface ApiRes {
  //   result: GroupItem[];
  //   status: string;
  //   reason?: string;
  // }

  // export interface ContentDiff {
  //   field: string;
  //   field_cn: string;
  //   prev: string;
  //   curr: string;
  // }
  // export interface ChangeRecordItem {
  //   id: number;
  //   uid: {
  //     id: number;
  //     username: string;
  //   }; // 合同id
  //   create_at: string;
  //   action: {
  //     action: string;
  //     act_name: string;
  //   };
  //   module: {
  //     module: string;
  //     name: string;
  //   };
  //   task: {
  //     task: string;
  //     name: string;
  //   };
  //   related_id: number;
  //   content: {
  //     id: number; // 二级模块id,create/delete只记录这个字段
  //     diff: ContentDiff[];
  //     name: string;
  //   };
  // }

  // export interface ProjectHoursListReq {
  //   pageSize: number;
  //   current: number;
  // }

  // export interface ProjectHoursListRes {
  //   status: 'ok' | 'error';
  //   reason: string;
  //   result: ProjectHoursListResult;
  // }
  // export interface ProjectHoursListResult {
  //   pageSize: number;
  //   total_page: number;
  //   total: number;
  //   current: number;
  //   list: ProjectHoursItem[];
  // }

  // export interface ProjectHoursItem {
  //   id: number;
  //   start_date: string;
  //   end_date: string;
  //   should_fill_count: number;
  //   have_fill_count: number;
  //   not_fill_count: number;
  //   not_fill_users: string;
  //   fill_rate: string;
  //   less_forty_hours_count: number;
  // }

  // export interface ProjectHoursUserListRes {
  //   status: 'ok' | 'error';
  //   reason: string;
  //   result: ProjectHoursUserItem[];
  // }

  // export interface ProjectHoursUserListReq {
  //   user_ids: string;
  // }
  // export interface ProjectHoursUserItem {
  //   id: number;
  //   username: string;
  //   department_id: number;
  //   department_name: string;
  //   job_number: number;
  // }

  // export type ChangeRecordRes = ListPageModel<ChangeRecordItem>;

  // export interface MenuItem {
  //   key: number;
  //   title: string; // 主菜单名称（中文）
  //   children: { key: string; title: string }[];
  // }

  // export interface MenuRes {
  //   result: MenuItem[];
  //   status: string;
  //   reason?: string;
  // }

  // export interface FeeDetailItem {
  //   id: number;
  //   original_data_id: string; // 原始数据
  //   project_name: string; // 项目名称
  //   project_code: string; // 项目编码
  //   department: {
  //     id: number; // 执行部门id
  //     department_name: string; // 执行部门名称
  //   }; // 一级部门
  //   amount: number; // 金额
  //   data_source: {
  //     // 数据来源
  //     id: number;
  //     name: string;
  //   };
  //   cost_type: {
  //     // 费用类型
  //     id: number;
  //     name: string;
  //   };
  //   create_time: number; // 时间戳 秒
  //   update_time: number; // 时间戳 秒
  // }

  // export type FeeDetailListRes = ListPageModel<FeeDetailItem>;

  // export interface FeeDetailListReq {
  //   pageSize: number;
  //   current: number;
  //   sort_order?: string;
  //   department?: number[];
  //   type?: string[];
  //   keyword?: string;
  // }

  // export interface FeeDetailProjectItem {
  //   project_name: string; // 项目名称
  //   project_type: string; // 项目类型
  //   project_code: string; // 项目编码
  //   department_id: number; // 部门
  // }

  // export interface FeeDetailProjectRes {
  //   result: FeeDetailProjectItem[];
  //   status: string;
  //   reason?: string;
  // }

  // // 创建费用明细
  // export interface FeeDetailReq {
  //   original_data_id: string;
  //   project_name: string;
  //   project_code: string;
  //   department_id: number;
  //   amount: number;
  //   data_source: number;
  //   cost_type: number;
  //   id?: number;
  // }

  // export interface FeeDetail {
  //   id: number;
  //   original_data_id: string; // 原始数据
  //   project_name: string; // 项目名称
  //   project_code: string; // 项目编码
  //   department_id: number; // 一级部门
  //   amount: number; // 金额
  //   data_source: number;
  //   cost_type: number;
  //   fee_user: number;
  //   create_by: number;
  //   update_by: number;
  //   create_time: number; // 时间戳 秒
  //   update_time: number; // 时间戳 秒
  // }

  // export interface FeeDetailRes {
  //   result: FeeDetail;
  //   status: string;
  //   reason?: string;
  // }
}
