@extends('admin.master')

@section('content')

<!-- Content Wrapper. Contains page content -->

<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        Transportation
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
                    <h3 class="box-title">Add/Edit Transport Product</h3>
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

                <form id="add-product" class="form-horizontal" method="post" action="{{ url('/admin/admin_productsave') }}">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <!--<input type="hidden" name="product_id" value="<?php echo ($product) ? $product->id : '0'; ?>">-->
                    <div class="box-body">

                        <div class="form-group">
                            <?php
                            if (old('ad_title'))
                                $ad_title = old('ad_title');
                            elseif ($product)
                                $ad_title = $product->ad_title;
                            else
                                $ad_title = '';
                            ?>
                            <label for="ad_title" class="col-sm-2 control-label">Ad-Title</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="ad_title" name="ad_title" placeholder="Ad Title" value="{{ $ad_title }}">
                            </div>
                        </div>
                        <input type="hidden" value="<?php echo ($product) ? $product->id : '0'; ?>" id="product_id" name="product_id"/>
                        <div class="form-group">
                            <label for="ad_type" class="col-sm-2 control-label">RENT or SALE?</label>
                            <div class="col-sm-10">
                                <select class="form-control" id="ad_type" name="ad_type">
                                    <option @if(!empty($product))
                                             @if($product->ad_type=='RENT')selected="selected"@endif 
                                             @endif  value="RENT">RENT</option>
                                    <option @if(!empty($product))
                                             @if($product->ad_type=='SALE')selected="selected"@endif 
                                             @endif 
                                             value="SALE">SALE</option>

                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('cover_image'))
                                $cover_image = old('cover_image');
                            elseif ($product)
                                $cover_image = $product->cover_image;
                            else
                                $cover_image = '';
                            ?>
                            <label for="price" class="col-sm-2 control-label">Cover-Image</label>
                            <div class="col-sm-10">
                                <input type="file" class="form-control" id="cover_image" name="cover_image" placeholder="cover image" value="{{ $cover_image }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('images'))
                                $images = old('cimage');
                            elseif ($product)
                                $images = $product->images;
                            else
                                $images = '';
                            ?>
                            <label for="images" class="col-sm-2 control-label">Other-Images</label>
                            <div class="col-sm-10">
                                <input type="file" class="form-control" name="images[]" placeholder="Other images" value="{{ $images }}">
                            </div>
                        </div>
                        <div id="add_new_image_block">
                        </div>
                        <div class="form-group"><a style=" float: right;margin-right: 80px;
                                                   text-decoration: none;" id="add_more_image" class="link-text alignleft add_new_portfolio" title="Add More" href="#">
                                <i class="fa fa-plus-circle" style="margin-right: 5px;"></i>Add More images
                            </a></div>
                        <div class="form-group">
                            <?php
                            if (old('price'))
                                $price = old('price');
                            elseif ($product)
                                $price = $product->price;
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
                            if (old('owner_name'))
                                $owner_name = old('owner_name');
                            elseif ($product)
                                $owner_name = $product->owner_name;
                            else
                                $owner_name = '';
                            ?>
                            <label for="owner_name" class="col-sm-2 control-label">Owner-Name</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="owner_name" name="owner_name" placeholder="Owner Name" value="{{ $owner_name }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('mobileno'))
                                $mobileno = old('mobileno');
                            elseif ($product)
                                $mobileno = $product->mobileno;
                            else
                                $mobileno = '';
                            ?>
                            <label for="mobileno" class="col-sm-2 control-label">Mobile-No.:</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" id="mobileno" name="mobileno" placeholder="Mobileno" value="{{ $mobileno }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('address'))
                                $address = old('address');
                            elseif ($product)
                                $address = $product->address;
                            else
                                $address = '';
                            ?>
                            <label for="address" class="col-sm-2 control-label">Address</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="address" name="address" placeholder="Address" value="{{ $address }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('city'))
                                $city = old('city');
                            elseif ($product)
                                $city = $product->city;
                            else
                                $city = '';
                            ?>
                            <label for="area" class="col-sm-2 control-label">City</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="city" name="city" placeholder="City" value="{{ $city }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <?php
                            if (old('description'))
                                $description = old('description');
                            elseif ($product)
                                $description = $product->desc;
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
                                    <option value="1" <?php
                                    if (!empty($product)) {
                                        if ($product->status == 1)
                                            echo "selected='selected'";
                                    }
                                    ?>>Active</option>
                                    <option value="0" <?php
                                    if (!empty($product)) {
                                        if ($product->status == 0)
                                            echo "selected='selected'";
                                    }
                                    ?>>Inactive</option>
                                </select>
                            </div>
                        </div>

                    </div><!-- /.box-body -->
                    <div class="box-footer">

                        <button type="submit" class="btn btn-primary btn-flat">Save</button>
                        <a class="btn btn-danger btn-flat pull-right" href="{{ url('admin/admin_product') }}">Cancel</a>
                    </div><!-- /.box-footer -->
                </form>
            </div><!-- /.box -->


        </div><!--/.col (right) -->
    </div>   <!-- /.row -->
</section><!-- /.content -->


<script>
    $(document).ready(function() {
        var max_fields = 5; //maximum input boxes allowed
        var wrapper = $("#add_new_image_block"); //Fields wrapper
        var add_button = $("#add_more_image"); //Add button ID
        var x = 1; //initlal text box count
        var i = 1;
        $(document).on('click', '#add_more_image', function(e) { //on add input button click
            if (x < max_fields) { //max input box allowed
                x++; //text box increment
                i++
                $(wrapper).append('\
    <div class="form-group">\n\
    <label for="images" class="col-sm-2 control-label">Other-Images</label>\n\
<div class="col-sm-10">\n\
               <input type="file" class="form-control" name="images[]" placeholder="Other images" value="">\n\
</div><a style="text-decoration: none; margin-left: 160px;" href="javascript:void(0)" id="remove_field" title="Remove Field" class="link-text alignright orange-text">\n\
<i class="fa fa-trash-o" style="margin-right: 5px;"></i>Remove</a>\n\
</div>'); //add input box
            }
        });

        $(wrapper).on("click", "#remove_field", function(e) { //user click on remove text
            e.preventDefault();
            $(this).parent().remove();
            x--;
        })
        $('#bedroomdiv').hide();
        $('#product_type').change(function() {
            if ($('#product_type').val() == '1') {
                $('#bedroomdiv').show();
            } else {
                $('#bedroomdiv').hide();
            }
        });

        var signupRules = {
            product_type: {
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


        $("#add-product").validate({
            ignore: "",
            rules: signupRules,
            messages: {
                product_type: {
                    required: "product Type Field is required"
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