$(document).ready(function () {
    
    $('#add-task-btn').click(function () {
        let name = $('#task-input').val().trim();
        if (!name) return;

        $.ajax({
            url: '/tasks',
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {
                name: name,
            },
            success: function (task) {
                $('#task-list').append(`
                    <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${task.id}">
                        <div>
                            <input type="checkbox" class="form-check-input me-2 complete-checkbox">
                            ${task.name}
                        </div>
                        <button class="btn btn-danger btn-sm delete-btn">Delete</button>
                    </li>
                `);
                $('#task-input').val('');
            },
            error: function (xhr) {
                alert(xhr.responseJSON.message);
            }
        });
    });


    $('#task-list').on('change', '.complete-checkbox', function () {
        let checkbox = $(this);
        let li = checkbox.closest('li');
        let id = li.data('id');
        let showAllChecked = $('#show-all').is(':checked');
    
        $.ajax({
            url: `/tasks/${id}/toggle`,
            type: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function () {
                if (checkbox.is(':checked') && !showAllChecked) {
                    li.remove();
                }
            }
        });
    });
    
    

    $('#task-list').on('click', '.delete-btn', function () {
        if (!confirm("Are u sure to delete this task ?")) return;

        let li = $(this).closest('li');
        let id = li.data('id');

        $.ajax({
            url: `/tasks/${id}`,
            type: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function () {
                li.remove();
            }
        });
    });


    $('#show-all').change(function () {
        let showAll = $(this).is(':checked');
        let url = showAll ? '/tasks/all' : '/tasks/incomplete';
    
        $.get(url, function (tasks) {
            $('#task-list').html('');
            tasks.forEach(function (task) {
                $('#task-list').append(`
                    <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${task.id}">
                        <div>
                            <input type="checkbox" class="form-check-input me-2 complete-checkbox" ${task.is_completed ? 'checked' : ''}>
                            ${task.name}
                        </div>
                        <button class="btn btn-danger btn-sm delete-btn">Delete</button>
                    </li>
                `);
            });
        });
    });
    
});