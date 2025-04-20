<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Todo App</title>
    
    <link href="{{asset("css/bootstrap.min.css")}}" rel="stylesheet">
    <script src="{{asset('js/bootstrap.min.js')}}"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">

</head>
<body class="p-4">
    <div class="container">
        @yield('content')
    </div>


    <script src="{{asset('js/jquery.min.js')}}"></script>
    <script src="{{asset('js/custom.js')}}"></script>
</body>
</html>
