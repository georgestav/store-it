@extends("layouts.results", ["location" => $location])

@section("results")
    <div id="app"></div>
    <script src="{{ mix('js/results.js') }}"></script>
@endsection