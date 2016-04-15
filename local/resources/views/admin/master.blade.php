<!DOCTYPE html>
<html class="st-layout ls-top-navbar ls-bottom-footer" lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>NeRPL</title>
        <!-- Tell the browser to be responsive to screen width -->
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <!-- Bootstrap 3.3.5 -->
        <link rel="stylesheet" href="{{ asset('/css/admin/bootstrap.min.css')}}">
        <!-- Font Awesome -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
        <!-- Ionicons -->
        <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
        <!-- Theme style -->
        <link rel="stylesheet" href="{{ asset('/css/admin/AdminLTE.css')}}">
        @if (Auth::check())
        <link rel="stylesheet" href="{{ asset('/css/admin/_all-skins.min.css')}}">
        @endif
        <!-- iCheck -->
        <link rel="stylesheet" href="{{ asset('/js/plugins/iCheck/square/blue.css')}}">
        <link rel="stylesheet" href="{{ asset('/css/custom.css')}}">

        <script src="{{ asset('/js/admin/jQuery-2.1.4.min.js')}}"></script>
        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
            <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->


        @yield('header')

    </head>


    @if (Auth::check())
    <body class="hold-transition skin-blue sidebar-mini">
        @else
    <body class="hold-transition login-page">
        @endif

        <div class="wrapper">
            @if (Auth::check())
            <header class="main-header">
                <!-- Logo -->
                <a href="{{ url('admin/dashboard') }}" class="logo">
                    <!-- mini logo for sidebar mini 50x50 pixels -->
                    <span class="logo-mini"><b>N</b>E</span>
                    <!-- logo for regular state and mobile devices -->
                    <span class="logo-lg"><b>Admin</b></span>
                </a>
                <!-- Header Navbar: style can be found in header.less -->
                <nav class="navbar navbar-static-top" role="navigation">
                    <!-- Sidebar toggle button-->
                    <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">



                            <!-- User Account: style can be found in dropdown.less -->
                            <li class="dropdown user user-menu">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <img src="{{ asset('/images/avatar5.png') }}" class="user-image" alt="User Image">
                                    <span class="hidden-xs">{{Auth::user()->first_name}} &nbsp; {{Auth::user()->last_name}}</span>
                                </a>
                                <ul class="dropdown-menu">
                                    <!-- User image -->
                                    <li class="user-header">
                                        <img src="{{ asset('/images/avatar5.png') }}" class="img-circle" alt="User Image">
                                        <p>
                                            {{Auth::user()->first_name}} &nbsp; {{Auth::user()->last_name}}
                                        </p>
                                    </li>

                                    <!-- Menu Footer-->
                                    <li class="user-footer">
                                        <div class="pull-left">
                                            <a href="#" class="btn btn-default btn-flat">Profile</a>
                                        </div>
                                        <div class="pull-right">
                                            <a href="{{ url('admin/logout') }}" class="btn btn-default btn-flat">Sign out</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <!-- Control Sidebar Toggle Button -->
                            <li>
                                <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <!-- Left side column. contains the logo and sidebar -->
            <aside class="main-sidebar">
                <!-- sidebar: style can be found in sidebar.less -->
                <section class="sidebar">
                    <!-- Sidebar user panel -->
                    <div class="user-panel">
                        <div class="pull-left image">
                            <img src="{{ asset('/images/avatar5.png') }}" class="img-circle" alt="User Image">
                        </div>
                        <div class="pull-left info">
                            <p>{{Auth::user()->first_name}} &nbsp; {{Auth::user()->last_name}}</p>
                        </div>
                    </div>

                    <!-- sidebar menu: : style can be found in sidebar.less -->
                    <ul class="sidebar-menu">

                        <li>
                            <a href="{{ url('admin/dashboard') }}">
                                <i class="fa fa-dashboard"></i> <span>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="{{ url('admin/admin_book_mart') }}">
                                <i class="fa fa-circle-o"></i> <span>Book-Mart</span>
                            </a>
                        </li>
                        <li>
                            <a href="{{ url('admin/admin_product') }}">
                                <i class="fa fa-circle-o"></i> <span>Transportation</span>
                            </a>
                        </li>
                        <li>
                            <a href="{{ url('admin/admin_pgshoms') }}">
                                <i class="fa fa-circle-o"></i> <span>PG-HOMES-SHOPS</span>
                            </a>
                        </li>
                        <li>
                            <a href="{{ url('admin/admin_cart_product') }}">
                                <i class="fa fa-circle-o"></i> <span>Cart-Product</span>
                            </a>
                        </li>
                        <!--<li class="treeview">
              <a href="#">
                <i class="fa fa-table"></i> <span>Tables</span>
                <i class="fa fa-angle-left pull-right"></i>
              </a>
              <ul class="treeview-menu">
                <li class="active"><a href="simple.html"><i class="fa fa-circle-o"></i> Simple tables</a></li>
                <li><a href="data.html"><i class="fa fa-circle-o"></i> Data tables</a></li>
              </ul>
            </li>-->

                    </ul>
                </section>
                <!-- /.sidebar -->
            </aside>

            @endif
            <!-- Full Width Column -->



            @if (Auth::check())
            <div class="content-wrapper">

                @if ($message = Session::get('success'))
                <div class="row">
                    <div class="col-md-12">
                        <div class="box-body">
                            <div class="alert alert-success alert-dismissable">
                                <button aria-hidden="true" data-dismiss="alert" class="close" type="button">X</button>
                                <h4><i class="icon fa fa-check"></i> Success!</h4>
                                {{ $message }}
                            </div>
                        </div>
                    </div>
                </div>
                @endif

                @yield('content')
            </div><!-- /.content-wrapper -->
            @else
            @yield('content')
            @endif




            @if (Auth::check())
            <footer class="main-footer">
                <div class="container">

                    <strong>Copyright &copy; 2015 <a href="#">NewEdge</a></strong>
                </div><!-- /.container -->
            </footer>
            <!-- Control Sidebar -->
            <aside class="control-sidebar control-sidebar-dark">
                <!-- Create the tabs -->
                <ul class="nav nav-tabs nav-justified control-sidebar-tabs">

                </ul>
                <!-- Tab panes -->
                <div class="tab-content">
                    <!-- Home tab content -->
                    <div class="tab-pane" id="control-sidebar-home-tab">

                    </div><!-- /.tab-pane -->
                    <!-- Stats tab content -->
                    <div class="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div><!-- /.tab-pane -->
                    <!-- Settings tab content -->

                </div>
            </aside><!-- /.control-sidebar -->
            <!-- Add the sidebar's background. This div must be placed
                 immediately after the control sidebar -->
            <div class="control-sidebar-bg"></div>
            @endif





            @yield('footer')
        </div><!-- ./wrapper -->
        <!-- jQuery 2.1.4 -->
        <script>
var baseURL = "{{ url() }}/";
        </script>
        <!-- Bootstrap 3.3.5 -->
        <script src="{{ asset('/js/admin/bootstrap.min.js')}}"></script>

        <!-- SlimScroll -->
        <script src="{{ asset('js/plugins/slimScroll/jquery.slimscroll.min.js')}}"></script>
        <!-- FastClick -->
        <script src="{{ asset('js/plugins/fastclick/fastclick.min.js')}}"></script>
        <!-- AdminLTE App -->
        <script src="{{ asset('js/admin/app.js')}}"></script>
        <script src="{{ asset('js/admin/demo.js')}}"></script>

        <!-- iCheck -->
        <script src="{{ asset('/js/admin/icheck.min.js')}}"></script>
        <script src="{{ asset('/js/jquery.validate.min.js') }}"></script>
        <script>
$(function() {
    $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });
});
        </script>
    </body>
</html>



