import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { fcm } from '../configs/firebase.config';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  deviceToken: string;
}

const tasks: Task[] = [];

/**
 * ✅ Create a new task and schedule a push notification
 */
export const createTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, description, dueDate, priority, deviceToken } = req.body;

    if (!title || !dueDate || !priority) {
      return res.status(400).json({ error: 'Title, dueDate, and priority are required.' });
    }

    if (!deviceToken) {
      return res.status(400).json({ error: 'Device token is required for notifications.' });
    }

    const newTask: Task = {
      id: uuidv4(),
      title,
      description: description || '',
      dueDate,
      priority,
      deviceToken
    };

    tasks.push(newTask);

    // ✅ Schedule Notification
    const delay = new Date(dueDate).getTime() - Date.now();
    if (delay > 0) {
      setTimeout(() => {
        sendTaskNotification(newTask);
      }, delay);
    }

    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task: newTask
    });
  } catch (error) {
    console.error('❌ Error creating task:', error);
    return res.status(500).json({ error: 'Failed to create task' });
  }
};

/**
 * ✅ Get all tasks
 */
export const getTasks = (req: Request, res: Response): Response => {
  return res.json({
    success: true,
    count: tasks.length,
    tasks
  });
};

/**
 * ✅ Send push notification via Firebase Cloud Messaging (FCM)
 */
const sendTaskNotification = async (task: Task): Promise<void> => {
  try {
    const message = {
      token: task.deviceToken,
      notification: {
        title: '📌 Task Reminder',
        body: `Your task "${task.title}" is due now.`
      },
      data: {
        taskId: task.id,
        dueDate: task.dueDate,
        priority: task.priority
      }
    };

    await fcm.send(message);
    console.log(`✅ Notification sent for task: ${task.title}`);
  } catch (error) {
    console.error('❌ Error sending notification:', error);
  }
};
