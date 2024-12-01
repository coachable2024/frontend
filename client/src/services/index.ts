import { taskService as apiTaskService } from './api/taskService';
import { mockTaskService } from './mock/mockTasks';
import { goalService as apiGoalService } from './api/goalService';
import { mockGoalService } from './mock/mockGoals';



// 使用环境变量或其他配置来决定使用哪个服务
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export const taskService = USE_MOCK ? mockTaskService : apiTaskService;
export const goalService = USE_MOCK ? mockGoalService : apiGoalService;
