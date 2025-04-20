@extends('layouts')

@section('content')
    <h1 class="mb-4">Todo App</h1>

    <div class="mb-3 d-flex">
        <input type="text" id="task-input" class="form-control me-2" placeholder="Enter task...">
        <button class="btn btn-primary" id="add-task-btn">Enter</button>
    </div>

    <ul class="list-group mb-3" id="task-list">
        @foreach($tasks as $task)
            <li class="list-group-item d-flex justify-content-between align-items-center" data-id="{{ $task->id }}">
                <div>
                    <input type="checkbox" class="form-check-input me-2 complete-checkbox">
                    {{ $task->name }}
                </div>
                <button class="btn btn-danger btn-sm delete-btn">Delete</button>
            </li>
        @endforeach
    </ul>

    <div class="form-check mb-3">
        <input type="checkbox" class="form-check-input" id="show-all">
        <label class="form-check-label" for="show-all">Show All Tasks</label>
    </div>
    @endsection