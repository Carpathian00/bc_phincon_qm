import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoType } from '../todo/todo.type';

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}