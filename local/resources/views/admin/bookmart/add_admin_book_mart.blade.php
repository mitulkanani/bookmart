@extends('admin.master')

@section('content')

<!-- Content Wrapper. Contains page content -->

<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        All Books
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
                    <h3 class="box-title">Add/Edit Books</h3>
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

                <form id="add-book_martt" enctype="multipart/form-data" class="form-horizontal" method="post" action="{{ url('/admin/admin_book_mart_productsave') }}">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <input type="hidden" name="book_mart_id"  id="book_mart_id" value="<?php echo ($book_mart) ? $book_mart->id : '0'; ?>">
                    <div class="box-body">
                        <div class="form-group">
                            <label for="sale_rent" class="col-sm-2 control-label">RENT or SALE?</label>
                            <div class="col-sm-10">
                                <select class="form-control" id="ad_type" name="ad_type">
                                    <option @if(!empty($book_mart))
                                             @if($book_mart->ad_type=='RENT')selected="selected"@endif 
                                             @endif  value="RENT">RENT</option>
                                    <option @if(!empty($book_mart))
                                             @if($book_mart->ad_type=='SALE')selected="selected"@endif 
                                             @endif 
                                             value="SALE">SALE</option>

                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="category" class="col-sm-2 control-label">Category</label>
                            <div class="col-sm-10">
                                <select class="form-control" id="category" name="category">
                                    <option @if(!empty($book_mart))
                                             @if($book_mart->category=='Engineering')selected="selected"@endif 
                                             @endif  value="Engineering">Engineering</option>
                                    <option @if(!empty($book_mart))
                                             @if($book_mart->category=='Medical')selected="selected"@endif 
                                             @endif  value="Medical">Medical</option>
                                    <option @if(!empty($book_mart))
                                             @if($book_mart->category=='Commerce')selected="selected"@endif 
                                             @endif  value="Commerce">Commerce</option>
                                    <option @if(!empty($book_mart))
                                             @if($book_mart->category=='Others')selected="selected"@endif 
                                             @endif  value="Others">Others</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('ad_title'))
                                $ad_title = old('ad_title');
                            elseif ($book_mart)
                                $ad_title = $book_mart->ad_title;
                            else
                                $ad_title = '';
                            ?>
                            <label for="ad_title" class="col-sm-2 control-label">Book title</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="ad_title" name="ad_title" placeholder="Ad Book name" value="{{ $ad_title }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('author_name'))
                                $author_name = old('author_name');
                            elseif ($book_mart)
                                $author_name = $book_mart->author_name;
                            else
                                $author_name = '';
                            ?>
                            <label for="author_name" class="col-sm-2 control-label">Author name</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="author_name" name="author_name" placeholder="Author Name" value="{{ $author_name }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('publication'))
                                $publication = old('publication');
                            elseif ($book_mart)
                                $publication = $book_mart->publication;
                            else
                                $publication = '';
                            ?>
                            <label for="publication" class="col-sm-2 control-label">Publication</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="publication" name="publication" placeholder="Publication" value="{{ $publication }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('edition'))
                                $edition = old('edition');
                            elseif ($book_mart)
                                $edition = $book_mart->edition;
                            else
                                $edition = '';
                            ?>
                            <label for="edition" class="col-sm-2 control-label">Edition</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="edition" name="edition" placeholder="Edition" value="{{ $edition }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('price'))
                                $price = old('price');
                            elseif ($book_mart)
                                $price = $book_mart->price;
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
                            if (old('college'))
                                $college = old('college');
                            elseif ($book_mart)
                                $college = $book_mart->college;
                            else
                                $college = '';
                            ?>
                            <label for="college" class="col-sm-2 control-label">College</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="college" name="college" placeholder="College" value="{{ $college }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('address'))
                                $address = old('address');
                            elseif ($book_mart)
                                $address = $book_mart->address;
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
                            elseif ($book_mart)
                                $city = $book_mart->city;
                            else
                                $city = '';
                            ?>
                            <label for="city" class="col-sm-2 control-label">City</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="city" name="city" placeholder="City" value="{{ $city }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('mobileno'))
                                $mobileno = old('mobileno');
                            elseif ($book_mart)
                                $mobileno = $book_mart->city;
                            else
                                $mobileno = '';
                            ?>
                            <label for="mobileno" class="col-sm-2 control-label">Mobileno</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" id="mobileno" name="mobileno" placeholder="Mobileno" value="{{ $mobileno }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('password'))
                                $password = old('password');
                            elseif ($book_mart)
                                $password = $book_mart->password;
                            else
                                $password = '';
                            ?>
                            <label for="mobileno" class="col-sm-2 control-label">Password</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" id="password" name="password" placeholder="Password" value="{{ $password }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('owner_name'))
                                $owner_name = old('owner_name');
                            elseif ($book_mart)
                                $owner_name = $book_mart->owner_name;
                            else
                                $owner_name = '';
                            ?>
                            <label for="owner_name" class="col-sm-2 control-label">Owner Name</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="owner_name" name="owner_name" placeholder="Owner Name" value="{{ $owner_name}}">
                            </div>
                        </div>

                        <div class="form-group">
                            <?php
                            if (old('cover_image'))
                                $cover_image = old('cover_image');
                            elseif ($book_mart)
                                $cover_image = $book_mart->front_big_img;
                            else
                                $cover_image = '';
                            ?>
                            <label for="cover_image" class="col-sm-2 control-label">Cover Image</label>
                            <div class="col-sm-10">
                                <input type="file" class="form-control" id="cover_image" name="cover_image" placeholder="cover_image" >
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('images'))
                                $images = old('images');
                            elseif ($book_mart)
                                $images = $book_mart->images;
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
                            if (old('description'))
                                $description = old('description');
                            elseif ($book_mart)
                                $description = $book_mart->description;
                            else
                                $description = '';
                            ?>
                            <label for="description" class="col-sm-2 control-label">Description</label>
                            <div class="col-sm-10">
                                <textarea placeholder="Description" rows="3" id="description" name="description" class="form-control"> {{ $description }}</textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <?php
                            if (old('fixed'))
                                $fixed = old('fixed');
                            elseif ($book_mart)
                                $fixed = $book_mart->fixed;
                            else
                                $fixed = '';
                            ?>
                            <label for="fixed" class="col-sm-2 control-label">Fixed or Negotiable</label>
                            <div class="col-sm-10">
                                <input type="radio" class="form-control" id="fixed" name="fixed" placeholder="Fixed or Negotiable" value="1">
                                <input type="radio" class="form-control" id="fixed" name="fixed" placeholder="Fixed or Negotiable" value="2">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="status" class="col-sm-2 control-label">Status</label>
                            <div class="col-sm-10">
                                <select class="form-control" id="status" name="status">
                                    <option value="">select</option>
                                    <option value="1" <?php
                                    if (!empty($book_mart)) {
                                        if ($book_mart->status == 1)
                                            echo "selected='selected'";
                                    }
                                    ?>>Active</option>
                                    <option value="0" <?php
                                    if (!empty($book_mart)) {
                                        if ($book_mart->status == 0)
                                            echo "selected='selected'";
                                    }
                                    ?>>Inactive</option>
                                </select>
                            </div>
                        </div>

                    </div><!-- /.box-body -->
                    <div class="box-footer">

                        <button type="submit" class="btn btn-primary btn-flat">Save</button>
                        <a class="btn btn-danger btn-flat pull-right" href="{{ url('admin/admin_book_mart') }}">Cancel</a>
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
            ad_title: {
                required: true
            },
            college: {
                required: true
            },
            mobileno: {
                required: true
            },
            password: {
                required: true
            },
            price: {
                required: true,
                minlength: 2
            },
            owner_name: {
                required: true,
                minlength: 3
            },
        };


        $("#add-book_martt").validate({
            ignore: "",
            rules: signupRules,
            messages: {
                ad_title: {
                    required: "ad Title Type Field is required"
                },
                college: {
                    required: "College name Field is required"
                },
                mobileno: {
                    required: "Mobileno Deal Field is required"
                },
                password: {
                    required: "Password is required"
                },
                price: {
                    required: "Price is required",
                },
                owner_name: {
                    required: "Owner Name is required",
                },
            }
        });
    });
</script>

@stop