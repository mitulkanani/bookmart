@extends('admin.master')

@section('content')

<!-- Content Wrapper. Contains page content -->

<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        Property
    </h1>

</section>

<!-- Main content -->
<section class="content">
    <div class="row">

        <!-- right column -->
        <div class="col-md-9">
            <!-- Horizontal Form -->
            <div class="box box-info">
                <div class="box-header with-border">
                    <h3 class="box-title">Add/Edit Property</h3>
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

                <form id="add-property" class="form-horizontal" method="post" action="{{ url('/admin/propertysave') }}">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <input type="hidden" name="property_id" value="<?php echo ($property) ? $property->id : '0'; ?>">
                    <div class="box-body">

                        <div class="form-group">
                            
                             
                            <label for="property_type" class="col-sm-2 control-label">Property Type</label>
                            <div class="col-sm-10">
                                <select class="form-control" id="property_type" name="property_type">
                                    <option value="">select</option>
                                    <?php
                                    foreach ($property_type as $key => $value) {?>
                                        <option value="{{$key}}" 
										@if(!empty($property))
										@if($property->property_type==$key)selected="selected"@endif
										@endif
										>{{$value}}</option>
                                   <?php } ?>

                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <?php
                            if (old('location'))
                                $location = old('location');
                            elseif ($property)
                                $location = $property->location;
                            else
                                $location = '';
                            ?>
                            <label for="inputEmail3" class="col-sm-2 control-label">Location</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="location" name="location" placeholder="Location" value="{{ $location }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="business_deal" class="col-sm-2 control-label">Business Deal</label>
                            <div class="col-sm-10">
                                <select class="form-control" id="business_deal" name="business_deal">
                                    <option value="">select</option>
                                    <?php foreach ($business_deal as $key => $value) { ?>
                                      <option value="{{$key}}" 
									  @if(!empty($property))
									  @if($property->business_deal==$key)selected="selected"@endif 
									  @endif 
									  >{{$value}}</option>
                                    <?php }?>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('price'))
                                $price = old('price');
                            elseif ($property)
                                $price = $property->price;
                            else
                                $price = '';
                            ?>
                            <label for="price" class="col-sm-2 control-label">Price</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" id="price" name="price" placeholder="Price" value="{{ $price }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('area'))
                                $area = old('area');
                            elseif ($property)
                                $area = $property->area;
                            else
                                $area = '';
                            ?>
                            <label for="area" class="col-sm-2 control-label">Area</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" id="area" name="area" placeholder="Area" value="{{ $area }}">
                            </div>
                        </div>
                        <div class="form-group" id="bedroomdiv">
                            <?php
                            if (old('no_of_bedrooms'))
                                $no_of_bedrooms = old('no_of_bedrooms');
                            elseif ($property)
                                $no_of_bedrooms = $property->no_of_bedrooms;
                            else
                                $no_of_bedrooms = '';
                            ?>
                            <label for="area" class="col-sm-2 control-label">No.Of Bedrooms</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" id="no_of_bedrooms" name="no_of_bedrooms" placeholder="No.Of Bedrooms" value="{{ $no_of_bedrooms }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <?php
                            if (old('description'))
                                $description = old('description');
                            elseif ($property)
                                $description = $property->description;
                            else
                                $description = '';
                            ?>
                            <label for="description" class="col-sm-2 control-label">Description</label>
                            <div class="col-sm-10">
                                <textarea placeholder="Description" rows="3" id="description" name="description" class="form-control"> {{ $description }}</textarea>
                            </div>
                        </div>



                        <div class="form-group">
                            <label for="status" class="col-sm-2 control-label">Status</label>
                            <div class="col-sm-10">
                                <select class="form-control" id="status" name="status">
                                    <option value="">select</option>
                                    <option value="0" <?php
                                    if (!empty($property)) {
                                        if ($property->status == 0)
                                            echo "selected='selected'";
                                    }
                                    ?>>Active</option>
                                    <option value="1" <?php
                                    if (!empty($property)) {
                                        if ($property->status == 1)
                                            echo "selected='selected'";
                                    }
                                    ?>>Inactive</option>
                                    <option value="2" <?php
                                    if (!empty($property)) {
                                        if ($property->status == 2)
                                            echo "selected='selected'";
                                    }
                                    ?>>Approve</option>
                                </select>
                            </div>
                        </div>

                    </div><!-- /.box-body -->
                    <div class="box-footer">

                        <button type="submit" class="btn btn-primary btn-flat">Save</button>
                        <a class="btn btn-danger btn-flat pull-right" href="{{ url('admin/property') }}">Cancel</a>
                    </div><!-- /.box-footer -->
                </form>
            </div><!-- /.box -->


        </div><!--/.col (right) -->
    </div>   <!-- /.row -->
</section><!-- /.content -->


<script>
    $(document).ready(function () {
        $('#bedroomdiv').hide();
        $('#property_type').change(function () {
			if ($('#property_type').val() == '1') {
                $('#bedroomdiv').show();
            } else {
                $('#bedroomdiv').hide();
            }
        });

        var signupRules = {
            property_type: {
                required: true
            },
            location: {
                required: true
            },
            business_deal: {
                required: true
            },
            status: {
                required: true
            },
            price: {
                required: true,
                minlength: 3
            },
            area: {
                required: true,
                minlength: 3
            },
            description: {
                required: true,
                minlength: 5
            }

        };


        $("#add-property").validate({
            ignore: "",
            rules: signupRules,
            messages: {
                property_type: {
                    required: "Property Type Field is required"
                },
                location: {
                    required: "Location Field is required"
                },
                business_deal: {
                    required: "Business Deal Field is required"
                },
                status: {
                    required: "Status is required"
                },
                price: {
                    required: "Price is required",
                },
                area: {
                    required: "Area is required",
                },
                description: {
                    required: "Description is required",
                    minlength: "Description must be at least 3 characters long"
                }
            }
        });
    });
</script>

@stop