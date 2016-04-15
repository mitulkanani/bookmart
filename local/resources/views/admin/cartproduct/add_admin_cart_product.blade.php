@extends('admin.master')

@section('content')

<!-- Content Wrapper. Contains page content -->

<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        All Cart Product
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
                    <h3 class="box-title">Add/Edit Cart Product</h3>
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

                <form id="add-cart_product" enctype="multipart/form-data" class="form-horizontal" method="post" action="{{ url('/admin/admin_cart_productsave') }}">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <input type="hidden" name="cart_product_id" value="<?php echo ($cart_product) ? $cart_product->id : '0'; ?>">
                    <div class="box-body">

                        <input type="hidden" value="<?php echo ($cart_product) ? $cart_product->id : '0'; ?>" id="cart_product_id" name="cart_product_id"/>
                        <div class="form-group">
                            <label for="cat_id" class="col-sm-2 control-label">Category</label>
                            <div class="col-sm-10">
                                <select class="form-control" id="ad_type" name="ad_type">
                                    @foreach($categories as $key=>$value)
                                    <option @if(!empty($cart_product))
                                             @if($cart_product->ad_type=='RENT')selected="selected"@endif 
                                             @endif  value="{{$value->id}}">{{$value->cat_name}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('full_name'))
                                $full_name = old('full_name');
                            elseif ($cart_product)
                                $full_name = $cart_product->full_name;
                            else
                                $full_name = '';
                            ?>
                            <label for="full_name" class="col-sm-2 control-label">Full Name</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="full_name" name="full_name" placeholder="Ad full name" value="{{ $full_name }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="sale_rent" class="col-sm-2 control-label">RENT or SALE?</label>
                            <div class="col-sm-10">
                                <select class="form-control" id="sale_rent" name="sale_rent">
                                    <option @if(!empty($cart_product))
                                             @if($cart_product->sale_rent=='RENT')selected="selected"@endif 
                                             @endif  value="RENT">RENT</option>
                                    <option @if(!empty($cart_product))
                                             @if($cart_product->sale_rent=='SALE')selected="selected"@endif 
                                             @endif 
                                             value="SALE">SALE</option>

                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('front_big_img'))
                                $front_big_img = old('front_big_img');
                            elseif ($cart_product)
                                $front_big_img = $cart_product->front_big_img;
                            else
                                $front_big_img = '';
                            ?>
                            <label for="front_big_img" class="col-sm-2 control-label">Front-big-image</label>
                            <div class="col-sm-10">
                                <input type="file" class="form-control" id="front_big_img" name="front_big_img" placeholder="front_big_img" >
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('back_big_img'))
                                $back_big_img = old('back_big_img');
                            elseif ($cart_product)
                                $back_big_img = $cart_product->back_big_img;
                            else
                                $back_big_img = '';
                            ?>
                            <label for="front_big_img" class="col-sm-2 control-label">Back-big-image</label>
                            <div class="col-sm-10">
                                <input type="file" class="form-control" id="back_big_img" name="back_big_img" placeholder="back_big_img" >
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('images'))
                                $images = old('images');
                            elseif ($cart_product)
                                $images = $cart_product->images;
                            else
                                $images = '';
                            ?>
                            <label for="images" class="col-sm-2 control-label">Other-Images</label>
                            <div class="col-sm-10">
                                <input type="file" class="form-control" name="images[]" placeholder="Other images" >
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
                            elseif ($cart_product)
                                $price = $cart_product->price;
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
                            if (old('discounts'))
                                $discounts = old('discounts');
                            elseif ($cart_product)
                                $discounts = $cart_product->discounts;
                            else
                                $discounts = '';
                            ?>
                            <label for="discounts" class="col-sm-2 control-label">Discounts</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="discounts" name="discounts" placeholder="discounts" value="{{ $discounts }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('shippingCost'))
                                $shippingCost = old('shippingCost');
                            elseif ($cart_product)
                                $shippingCost = $cart_product->shippingCost;
                            else
                                $shippingCost = '';
                            ?>
                            <label for="shippingCost" class="col-sm-2 control-label">shippingCost</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" id="shippingCost" name="shippingCost" placeholder="shippingCost" value="{{ $shippingCost }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <?php
                            if (old('description'))
                                $description = old('description');
                            elseif ($cart_product)
                                $description = $cart_product->description;
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
                                    if (!empty($cart_product)) {
                                        if ($cart_product->status == 1)
                                            echo "selected='selected'";
                                    }
                                    ?>>Active</option>
                                    <option value="0" <?php
                                    if (!empty($cart_product)) {
                                        if ($cart_product->status == 0)
                                            echo "selected='selected'";
                                    }
                                    ?>>Inactive</option>
                                </select>
                            </div>
                        </div>

                    </div><!-- /.box-body -->
                    <div class="box-footer">

                        <button type="submit" class="btn btn-primary btn-flat">Save</button>
                        <a class="btn btn-danger btn-flat pull-right" href="{{ url('admin/admin_cart_product') }}">Cancel</a>
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
        $('#cart_product_type').change(function() {
            if ($('#cart_product_type').val() == '1') {
                $('#bedroomdiv').show();
            } else {
                $('#bedroomdiv').hide();
            }
        });

        var signupRules = {
            full_name: {
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


        $("#add-cart_product").validate({
            ignore: "",
            rules: signupRules,
            messages: {
                full_name: {
                    required: "full_name Type Field is required"
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