@extends('admin.master')

@section('content')
<!-- content push wrapper -->
<div class="st-pusher" id="content">
    <!-- sidebar effects INSIDE of st-pusher: -->
    <!-- st-effect-3, st-effect-6, st-effect-7, st-effect-8, st-effect-14 -->
    <!-- this is the wrapper for the content -->
    <div class="st-content">
        <!-- extra div for emulating position:fixed of the menu -->
        <div class="st-content-inner">
            <div class="container">

                <div class="media media-grid media-clearfix-xs">

                    <div class="media-body">
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
                        <form id="profile_form" class="form-horizontal" role="form" method="POST" action="{{url('saveprofile')}}">
 <input type="hidden" name="_token" value="{{ csrf_token() }}">   
                            <div class="col-md-6 col-sm-12">

                                <input type="hidden" id="username_valid" value="" name="username_valid" />
                                <input type="hidden" id="email_valid" value="" name="email_valid" />
                                <input type="hidden" id="redirect" value="/thank-you" name="redirect" />

                                <div class="form-group">
                                    <div class="col-sm-12">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-user"></i></span>
                                           <?php if(old('full_name'))
                                                $fullNameValue = old('full_name');
                                            else
                                                $fullNameValue = $user_profile_data->full_name;
                                            ?>
                                            <input type="text" class="form-control" name="full_name" placeholder="Full Name" value="{{$fullNameValue}}">
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">

                                    <div class="col-sm-12">
                                        <div class="input-group">
                                             <?php if(old('email'))
                                                $emailValue = old('email');
                                            else
                                                $emailValue = $user_profile_data->email;
                                            ?>
                                            <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                                            <input type="text" class="form-control" id="email" name="email" placeholder="Email Address" value="{{$emailValue}}">
                                        </div>
                                        <span id="email_result"></span>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-sm-12">
                                        <div class="input-group">
                                             <?php if(old('username'))
                                                $usernameValue = old('username');
                                            else
                                                $usernameValue = $user_profile_data->username;
                                            ?>
                                            <span class="input-group-addon"><i class="fa fa-at"></i></span>
                                            <input type="text" class="form-control" id="username" name="username" placeholder="Username" value="{{$usernameValue}}">

                                        </div>
                                        <span id="username_result"></span>
                                    </div>
                                </div>							            							            							            

                                <div class="form-group">

                                    <div class="col-sm-12">
                                        <div class="input-group">
                                            <?php if(old('aboutme'))
                                                $aboutmeValue = old('aboutme');
                                            else
                                                $aboutmeValue = $user_profile_data->aboutme;
                                            ?>
             <h5>About me</h5>
                                            <textarea rows="3" cols="42" style="resize:none;" placeholder="About Me" name="aboutme" id="aboutme" maxlength="500" class="form-control">{{$aboutmeValue}}</textarea><div id="textarea_feedback" style=""></div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-12">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
   //$('#profile_form input').attr('readonly', 'readonly');
</script>        

@stop