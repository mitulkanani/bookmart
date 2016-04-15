@extends('admin.master')

@section('content')
<!-- content push wrapper -->

<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        Users
        <small>Manage Users</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="{{ url('admin/adduser') }}"><span class="add-link"> Add User </span> </a></li>
    </ol>
</section>

<!-- Main content -->
<section class="content">
    <div class="row">

        <div class="col-md-12">
            <div class="box">
                <div class="box-header">
                    <h3 class="box-title">Users</h3>
                </div><!-- /.box-header -->
                <div class="box-body no-padding">
                    <table class="table table-striped">
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Is Verified</th>
                            <th>Action</th>
                        </tr>
                        @foreach($users as $key=>$value)
                        <tr>
                            <td>
                                <a href="{{ url('/admin/users/') }}/{{$value->id}}">{{$value->first_name}} &nbsp; {{$value->last_name}}</a>
                            </td>
                            <td>
                                {{$value->username}}
                            </td>
                            <td>
                                {{$value->email}}
                            </td>
                            <td>
                                @if($value->status==1)
                                Active
                                @else
                                Inactive
                                @endif
                            </td>

                            <td>
                                <input type="checkbox" name="is_verified" id="is_verified"  @if($value->is_verified==1) checked='checked' @endif />
                            </td>
                            <td>
                                <a href="{{ url('/admin/edituser/') }}/{{$value->id}}">Edit</a>
                                <a onclick="return confirm('Are you sure you want to delete this user?')" href="{{ url('/admin/deleteuser/') }}/{{$value->id}}">Delete</a>
                            </td>
                        </tr>
                        @endforeach
                    </table>
                </div><!-- /.box-body -->
            </div><!-- /.box -->
        </div><!-- /.col -->
    </div><!-- /.row -->

</section><!-- /.content -->

<script>
</script>
@stop