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
<script src="{{asset('ckeditor/ckeditor.js')}}"></script>
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
                <form id="add-cms" class="form-horizontal" method="post" action="{{ url('/admin/cmssave') }}">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <input type="hidden" name="cms_id" value="<?php echo ($cms)?$cms->id:'0';?>">
                    <div class="box-body">

                        <div class="form-group">
                            <?php
                            if (old('subject'))
                                $subject = old('subject');
                            elseif ($cms)
                                $subject = $cms->subject;
                            else
                                $subject = '';
                            ?>
                            <label for="inputEmail3" class="col-sm-2 control-label">Subject</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="subject" name="subject" placeholder="Subject" value="{{$subject}}">
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('slug'))
                                $slug = old('slug');
                            elseif ($cms)
                                $slug = $cms->slug;
                            else
                                $slug = '';
                            ?>
                            <label for="inputEmail3" class="col-sm-2 control-label">Slug</label>
                            <div class="col-sm-10">
                                <input type="text" readonly="true" class="form-control" id="slug" name="slug" placeholder="slug" value="{{$slug}}">
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('texteditor'))
                                $message = old('texteditor');
                            elseif ($cms)
                                $message = $cms->message;
                            else
                                $message = '';
                            ?>
                            <label for="inputEmail3" class="col-sm-2 control-label">Message</label>
                            <div class="col-sm-10">
                                <textarea name="texteditor" id="texteditor">{{$message}}</textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="inputPassword3" class="col-sm-2 control-label">Status</label>
                            <div class="col-sm-10">
                                <select class="form-control" id="status" name="status">
                                    <option value="">select</option>
                                    <option value="1" <?php
                                    if (!empty($user)) {
                                        if ($user->status == 1)
                                            echo "selected='selected'";
                                    }
                                    ?>>Active</option>
                                    <option value="0" <?php
                                    if (!empty($user)) {
                                        if ($user->status == 0)
                                            echo "selected='selected'";
                                    }
                                    ?>>Inactive</option>
                                </select>
                            </div>
                        </div>

                    </div><!-- /.box-body -->
                    <div class="box-footer">

                        <button type="submit" class="btn btn-primary btn-flat">Save</button>
                        <a class="btn btn-danger btn-flat pull-right" href="{{ url('admin/cms') }}">Cancel</a>
                    </div><!-- /.box-footer -->
                </form>
            </div><!-- /.box -->


        </div><!--/.col (right) -->
    </div>   <!-- /.row -->
</section><!-- /.content -->


<script>
$('#subject').keyup(function () {
    var str = $(this).val();
    str = str.replace(/[^a-zA-Z0-9\s]/g, "");
    str = str.toLowerCase();
    str = str.replace(/\s/g, '-');
    $('#slug').val(str);
});
CKEDITOR.replace('texteditor');
$(document).ready(function () {

    var signupRules = {
        first_name: {
            required: true
        },
        last_name: {
            required: true
        },
        status: {
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