<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::where('is_completed', false)->get();
        return view('tasks.index', compact('tasks'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:tasks,name',
        ]);

        $task = Task::create([
            'name' => $request->name,
        ]);

        return response()->json($task);
    }

    public function toggle(Task $task)
    {
        $task->is_completed = !$task->is_completed;
        $task->save();

        return response()->json(['success' => true]);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['success' => true]);
    }

    public function allTasks()
    {
        return response()->json(Task::all());
    }
    public function incompleteTasks()
    {
        return response()->json(Task::where('is_completed', false)->get());
    }

}