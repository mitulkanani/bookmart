@extends('admin.master')

@section('content')

<!-- Content Wrapper. Contains page content -->

        <!-- Content Header (Page header) -->
        <section class="content-header">
          <h1>
            Users
          </h1>
          <!--<ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li><a href="#">Forms</a></li>
            <li class="active">General Elements</li>
          </ol>-->
        </section>

        <!-- Main content -->
        <section class="content">
          <div class="row">

            <!-- right column -->
            <div class="col-md-9">
              <!-- Horizontal Form -->
              <div class="box box-info">
                <div class="box-header with-border">
                  <h3 class="box-title">Add/Edit User</h3>
                </div><!-- /.box-header -->
                <!-- form start -->
                @if (count($errors) > 0)
                    <div class="alert alert-danger">
                        <strong>Whoops!</strong> There were some problems with your input.<br><br>
                        <ul>
                            @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                    @endif

                <form id="add-user" class="form-horizontal" method="post" action="{{ url('/admin/usersave') }}">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="hidden" name="user_id" value="<?php echo ($user)?$user->id:'0';?>">
                  <div class="box-body">

                    <div class="form-group">
                      <?php
                      if (old('first_name'))
                          $first_name = old('first_name');
                      elseif($user)
                          $first_name = $user->first_name;
                      else
                          $first_name = '';
                      ?>
                      <label for="inputEmail3" class="col-sm-2 control-label">First name</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" id="first_name" name="first_name" placeholder="First Name" value="{{$first_name}}">
                      </div>
                    </div>

                    <div class="form-group">
                      <?php
                      if (old('last_name'))
                          $last_name = old('last_name');
                      elseif($user)
                          $last_name = $user->last_name;
                      else
                          $last_name = '';
                      ?>
                      <label for="inputEmail3" class="col-sm-2 control-label">Last name</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" id="last_name" name="last_name" placeholder="Last Name" value="{{ $last_name }}">
                      </div>
                    </div>

                    <div class="form-group">
                      <?php
                      if (old('email'))
                          $email = old('email');
                      elseif($user)
                          $email = $user->email;
                      else
                          $email = '';
                      ?>
                      <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" id="email" name="email" placeholder="Email" value="{{ $email }}">
                      </div>
                    </div>

                    <div class="form-group">
                      <?php
                      if (old('aboutme'))
                          $aboutme = old('aboutme');
                      elseif($user)
                          $aboutme = $user->aboutme;
                      else
                          $aboutme = '';
                      ?>
                      <label for="inputEmail3" class="col-sm-2 control-label">About Me</label>
                      <div class="col-sm-10">
                        <textarea placeholder="About me" rows="3" id="aboutme" name="aboutme" class="form-control"> {{ $aboutme }}</textarea>
                      </div>
                    </div>


                    <div class="form-group">
                      <?php
                      if (old('username'))
                          $username = old('username');
                      elseif($user)
                          $username = $user->username;
                      else
                          $username = '';
                      ?>
                      <label for="inputEmail3" class="col-sm-2 control-label">Username</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" id="username" name="username" placeholder="Username" value="{{ $username }}">
                      </div>
                    </div>

                    @if(empty($user))
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
                      <div class="col-sm-10">
                        <input type="password" class="form-control" id="password" name="password" placeholder="Password">
                      </div>
                    </div>
                    @endif

                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">Status</label>
                      <div class="col-sm-10">
                        <select class="form-control" id="status" name="status">
                            <option value="">select</option>
                            <option value="1" <?php if(!empty($user)){ if($user->status == 1) echo "selected='selected'"; }?>>Active</option>
                            <option value="0" <?php if(!empty($user)){ if($user->status == 0) echo "selected='selected'"; }?>>Inactive</option>
                        </select>
                      </div>
                    </div>

                  </div><!-- /.box-body -->
                  <div class="box-footer">

                    <button type="submit" class="btn btn-primary btn-flat">Save</button>
                    <a class="btn btn-danger btn-flat pull-right" href="{{ url('admin/dashboard') }}">Cancel</a>
                  </div><!-- /.box-footer -->
                </form>
              </div><!-- /.box -->


            </div><!--/.col (right) -->
          </div>   <!-- /.row -->
        </section><!-- /.content -->


<script>
    $(document).ready(function() {

        var signupRules = {
            first_name: {
                required: true
            },
            last_name: {
                required: true
            },
            status:{
              required: true
            },
            email: {
                required: true,
                email: true
            },
            username: {
                required: true,
                minlength: 3
            },
            password: {
                required: true,
                minlength: 5
            }

        };


        $("#add-user").validate({
            ignore: "",
            rules: signupRules,
            messages: {
                first_name: {
                    required: "First name is required"
                },
                last_name: {
                    required: "Last name is required"
                },
                status: {
                    required: "Status is required"
                },
                password: {
                    required: "Password is required",
                    minlength: "Password must be at least 5 characters long"
                },
                email: {
                    required: "Email is required",
                    email: "Please enter a valid email address"
                },
                username: {
                    required: "Username is required",
                    minlength: "Username must be at least 3 characters long"
                }
            }
        });
    });
</script>

@stop