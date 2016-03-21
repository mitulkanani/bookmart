
<body bgcolor="#ffffff">
    <div id="page-wrapper">
        <form method="post" style="background-color:#FFFFFF;font-size:14px;font-family:'Roboto',Arial,Helvetica,sans-serif;color:#34495E;margin-top: -8px;"
              class="formoid-solid-purple" enctype="multipart/form-data"
              action="{{url('adSave')}}"
              novalidate="novalidate">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <div class="element-radio">
                <label class="title">Select</label>	
                <div class="column column3"><label><input type="radio" value="book" name="radio"><span>Book</span>
                    </label></div>
                <div class="column column3"><label><input type="radio" value="others" name="radio">
                        <span>Others</span></label></div>
                <div class="column column3"><label><input type="radio" value="pg-rooms" name="radio">
                        <span>PG-Rooms</span></label></div>
            </div>
            <div class="element-input">
                <label class="title">Ad-title</label>
                <div class="item-cont">
                    <input required="true" type="text" placeholder="Book-name,PG-rooms,others..." name="ad_title" class="large"/>
                    <span class="icon-place"></span>
                </div>
            </div>
            <div class="element-input field-book desc" style="display: none;">
                <label class="title"></label>
                <div class="item-cont">
                    <input required="true" type="text" placeholder="Auther-name" name="auther_name" class="large"/>
                    <span class="icon-place"></span>
                </div>
            </div>
            <div class="element-input field-book desc" style="display: none;">
                <label class="title"></label>
                <div class="item-cont">
                    <input  type="text" placeholder="Publication" name="publication" class="large"/>
                    <span class="icon-place"></span>
                </div>
            </div>
            <div class="element-input field-book desc" style="display: none;">
                <label class="title"></label>
                <div class="item-cont">
                    <input type="text" placeholder="Edition..Ex.2014-2015,2nd,4th..." name="edition" class="large"/>
                    <span class="icon-place"></span>
                </div>
            </div>
            <div class="element-select">
                <label class="title">Category</label>
                <div class="item-cont">
                    <div class="large">
                        <span>
                            <select name="category" style="display: none;">
                                <option value="engineering">Engineering</option>
                                <option value="medical">Medical</option>
                                <option value="commerce">Commerce</option>
                                <option value="others">Others</option>
                                <option value="pgrooms">PG-ROOMS</option>
                            </select>
                            <i></i><span class="icon-place"></span></span>
                    </div>
                </div>
            </div>
            <div class="element-input">
                <label class="title"></label>
                <div class="item-cont">
                    <input required="true" type="number" placeholder="&#x20b9;  Price" name="price" class="large"/>
                    <span class="icon-place"></span>
                </div>
            </div>
            <div class="column column3">
                <label><input type="radio" value="fixed" name="fixed"><span>Fixed</span></label>
            </div>
            <div class="column column3">
                <label><input type="radio" value="negotiable" name="fixed"><span>Negotiable</span></label>
            </div>

            <div class="element-file">
                <label class="title">Cover-image</label>
                <div class="item-cont">
                    <label class="large">
                        <div class="button">Choose File</div>
                        <input required="true" type="file" name="cover_image" class="file_input">
                        <div class="file_text">No file selected</div>
                        <span class="icon-place"></span>
                    </label>
                </div>
            </div>
            <div class="element-file">
                <label class="title">Other-image</label>
                <div class="item-cont">
                    <label class="large">
                        <div class="button">Choose File</div>
                        <input type="file" name="images[]" class="file_input">
                        <div class="file_text">No file selected</div>
                        <span class="icon-place"></span>
                    </label>
                </div>
            </div>
            <div id="add_new_image_block">
            </div>
            <a style="margin-left: 25px;
               text-decoration: none;" id="add_more_image" class="link-text alignleft add_new_portfolio" title="Add More" href="#">
                <i class="fa fa-plus-circle" style="margin-right: 5px;"></i>Add More images
            </a>
            <div class="element-input">
                <label class="title"></label>
                <div class="item-cont">
                    <input required="true" type="text" placeholder="Owner-name" name="owner_name" class="large"/>
                    <span class="icon-place"></span>
                </div>
            </div>
            <div class="element-phone">
                <label class="title"></label>
                <div class="item-cont">
                    <input type="tel" value="" placeholder="Mobile no." name="mobileno" maxlength="24" pattern="[+]?[\.\s\-\(\)\*\#0-9]{3,}" class="large">
                    <span class="icon-place"></span>
                </div>
            </div>
            <div class="element-input">
                <label class="title"></label>
                <div class="item-cont">
                    <input type="text" value="" placeholder="College-name" name="input" class="large"/>
                    <span class="icon-place"></span>
                </div>
            </div>
            <div class="element-address">
                <label class="title"></label>
                <span class="addr1"><input type="text" name="address" placeholder="Address">
                    <span class="icon-place"></span>
                </span>
                <span class="city">
                    <input type="text" name="city" placeholder="City">
                    <span class="icon-place"></span>
                </span>
            </div>

            <div class="element-radio">
                <label class="title">Select</label>	
                <div class="column column3"><label><input required="true" type="radio" value="SALE" name="ad_type"><span>SALE</span>
                    </label></div>
                <div class="column column3"><label><input type="radio" value="RENT" name="ad_type">
                        <span>RENT</span></label></div>
            </div>
            <div class="submit">
                <button type="button" class="btn btn-default" data-dismiss="modal" style="width: 41%;
                        background: #98ce44;
                        color: #fff;
                        text-align: center; ">Close</button>
                <input type="submit" value="Submit" style="width: 44%;">
            </div>
        </form>
    </div>
    <script type="text/javascript" src="{{ asset('/js/front/formoid-solid-purple.js')}}"></script>
    <script>
// For Add More images
$(document).ready(function() {
    $("input[name$='radio']").click(function() {
        var test = $(this).val();
        $(".desc").hide();
        $(".field-" + test).show();
    });

    var max_fields = 5; //maximum input boxes allowed
    var wrapper = $("#add_new_image_block"); //Fields wrapper
    var add_button = $("#add_more_image"); //Add button ID
    var x = 1; //initlal text box count
    var i = 1;
    $(document).on('click', '#add_more_image', function(e) { //on add input button click
        if (x < max_fields) { //max input box allowed
            x++; //text box increment
            i++
            $(wrapper).append('<div><div class="element-file">\n\
            <label class="title"></label><div class="item-cont"><label class="large">\n\
            <div class="button">Choose File</div>\n\
<input type="file" name="images[]" class="file_input"><div class="file_text">No file selected</div>\n\
<span class="icon-place"></span></label></div></div>\n\
<a style="text-decoration: none;" href="javascript:void(0)" id="remove_field" title="Remove Field" class="link-text alignright orange-text">\n\
<i class="fa fa-trash-o" style="margin-right: 5px;"></i>Remove</a></div>'); //add input box
        }
    });

    $(wrapper).on("click", "#remove_field", function(e) { //user click on remove text
        e.preventDefault();
        $(this).parent().remove();
        x--;
    })
});
    </script>

