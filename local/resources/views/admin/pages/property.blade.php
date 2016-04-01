@extends('admin.master')

@section('content')
<!-- content push wrapper -->

<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        Property
        <small>Manage Property</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="{{ url('admin/addproperty') }}"><span class="add-link"> Add Property </span> </a></li>
    </ol>
</section>

<!-- Main content -->
<section class="content">
    <div class="row">

        <div class="col-md-12">
            <div class="box">
                <div class="box-header">
                    <h3 class="box-title">Property</h3>
                </div><!-- /.box-header -->
                <div class="box-body no-padding">
                    <table class="table table-striped">
                        <tr>
                            <th>Property Type</th>
                            <th>Location</th>
                            <th>Business Deal</th>
                            <th>Price</th>
                            <th>Area</th>
                            <th>no.Of Bedrooms</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Upload Image</th>
                        </tr>
                        @foreach($properties as $key=>$value)
                        <tr>
                            <td>
                                @if($value->property_type==1)
                                <a href="{{ url('/admin/properties/') }}/{{$value->id}}">Residencial</a>
                                @elseif($value->property_type==2)
                                <a href="{{ url('/admin/properties/') }}/{{$value->id}}">Commercial</a>
                                @else
                                <a href="{{ url('/admin/properties/') }}/{{$value->id}}">Office</a>
                                @endif
                            </td>
                            <td>
                                {{$value->location}}
                            </td>
                            <td>
                                @if($value->business_deal==1)
                                Bye
                                @elseif($value->business_deal==2)
                                Rent
                                @else
                                Sale
                                @endif
                            </td>
                            <td>
                                {{$value->price}}
                            </td>
                            <td>
                                {{$value->area}}
                            </td>
                            <td>
                                {{$value->no_of_bedrooms}}
                            </td>
                            <td>
                                {{$value->description}}
                            </td>
                            <td>
                                @if($value->status==0)
                                Active
                                @elseif($value->status==1)
                                Inactive
                                @else
                                Approve
                                @endif
                            </td>

                            <td>
                                <a href="{{ url('/admin/editproperty/') }}/{{$value->id}}">Edit</a>
                                <a onclick="return confirm('Are you sure you want to delete this user?')" href="{{ url('/admin/deleteproperty/') }}/{{$value->id}}">Delete</a>
                            </td>
                            <td><a href="{{ url('/admin/uploadImage/') }}/{{$value->id}}" ><img  src="{{asset('/images/upload_icon.png')}}"/></a></td>
                        </tr>
                        @endforeach
                    </table>
                </div><!-- /.box-body -->
            </div><!-- /.box -->
        </div><!-- /.col -->
    </div><!-- /.row -->
     <form id="form1">
        <div>
            <div id="popupdiv" title="Uploadd Image" style="display: none">
                <b> Welcome to Aspdotnet-Suresh.com</b>
            </div>
            <table align="center" style="margin-top:200px">
                <tr>
                    <td>

                    </td>
                </tr>
            </table>
        </div>
    </form>
</section><!-- /.content -->

<script>
</script>
@stop