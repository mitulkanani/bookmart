<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Requests\adminAddProductRequest;
use Illuminate\Http\Request;
use Session;
use App\User;
use Input;
use Auth;
use Config;
use Redirect;
use Image;
use Validator;
use File;
use App\UploadImage;
use Response;
use App\Transport;

class TransportController extends Controller {

    public function __construct() {
        $this->middleware('auth.adminOnly');
        $this->userOBJ = new User();
        $this->transportOBJ = new Transport();
    }

    public function product() {
        $transportList = $this->transportOBJ->getTransportForadminList();
        return view('admin.transportation.transportpage', compact('transportList'));
    }

    public function addproduct() {
        $product = array();
        return view('admin.transportation.addadminproduct', compact('product'));
    }

    public function uploadImage($propertyId) {
        $property = UploadImage::where("property_id", $propertyId)->get();

        if ($property == null) {
            $property_data = array();
        } else {
            $property_data = UploadImage::where("property_id", $propertyId)->get();
        }
        return view('admin.uploadimage')->with('propertyId', $propertyId)->with('property_data', $property_data);
    }

    public function editAdmin_product($productId) {
        $product = Transport::find($productId);
        return view('admin.transportation.addadminproduct', compact('product'));
    }

    public function saveproduct(adminAddProductRequest $request) {
        $product_id = Input::get('product_id');
        $ad_title = Input::get('ad_title');
        $ad_type = e(Input::get('ad_type'));
        $cover_image = e(Input::get('cover_image'));
        $price = e(Input::get('price'));
        $owner_name = e(Input::get('owner_name'));
        $mobileno = e(Input::get('mobileno'));
        $address = e(Input::get('address'));
        $city = e(Input::get('city'));
        $description = e(Input::get('description'));
        $status = e(Input::get('status'));

        if ($product_id > 0) {
            $product = Transport::find($product_id);
            $product->ad_title = $ad_title;
            $product->ad_type = $ad_type;
            $product->cover_image = $cover_image;
            $product->price = $price;
            $product->owner_name = $owner_name;
            $product->mobileno = $mobileno;
            $product->address = $address;
            $product->city = $city;
            $product->desc = $description;
            $product->status = $status;
            $product->save();
            if ($product) {
                return Redirect::to("admin/admin_product")->with('success', 'Product edited successfully');
            }
        } else {
            $transportlist = Transport::create(array(
                        'ad_title' => $ad_title,
                        'ad_type' => $ad_type,
                        'cover_image' => $cover_image,
                        'price' => $price,
                        'owner_name' => $owner_name,
                        'mobileno' => $mobileno,
                        'address' => $address,
                        'city' => $city,
                        'desc' => $description,
                        'status' => $status,
            ));
            if ($transportlist) {
                return Redirect::to("admin/admin_product")->with('success', 'Product added successfully');
            }
        }
    }

    public function deleteAdmin_product($product_id) {
        $product = Transport::find($product_id)->delete();
        return Redirect::to("admin/admin_product")->with('success', 'Product deleted successfully');
    }

    public function deleteImage() {
        $productid = Input::get('propertyid');
        $DeleteImageid = Input::get('id');
        $uploadimage = UploadImage::find($DeleteImageid)->delete();

        $product_data = UploadImage::where("productid", $productid)->get();
        return view('admin.ajax-uploadImage', compact('product_data'));
    }

    public function getProductDetails($ProductID) {
        $product_data = Transport::where("id", $ProductID)->first();
        return view('admin.transportation.productadmindetails', compact('product_data'))->with('transportOBJ', $this->transportOBJ);
    }

    public function imageSave($id) {

        $property_data = Property::where("id", $id)->first();

        $pathoriginal = 'property_picture/original/';
        $path50 = 'property_picture/thumbnail/';

        $rules = array('profile_picture' => 'required', 'profile_picture' => 'mimes:jpeg,bmp,png');
        if (Input::hasFile('profile_picture')) {
            $fileName = Input::file('profile_picture');
            $file = array('profile_picture' => Input::file('profile_picture'));
            $validator = Validator::make($file, $rules);
            if ($validator->fails()) {
                // send back to the page with the input data and errors
                echo json_encode(array('status' => 'fail', 'profileimage' => '', 'headerimage' => ''));
            } else {
                // checking file is valid.
                if (Input::file('profile_picture')->isValid()) {
                    //$destinationPath = 'uploads'; // upload path
                    $extension = Input::file('profile_picture')->getClientOriginalExtension(); // getting image extension
                    $fileName = time() . $id . '.' . $extension; // renameing image
//                    dd($pathoriginal, $fileName);
                    Input::file('profile_picture')->move($pathoriginal, $fileName); // uploading file to given path
//                    File::copy($pathoriginal . $fileName, $path110 . $fileName);
//                    Image::make($path110 . $fileName)
//                            ->resize('270', '320')
//                            ->save($path110 . $fileName);
//
                    File::copy($pathoriginal . $fileName, $path50 . $fileName);
                    Image::make($path50 . $fileName)
                            ->resize('50', '50')
                            ->save($path50 . $fileName);
//
//                    File::copy($pathoriginal . $fileName, $path220 . $fileName);
//                    Image::make($path220 . $fileName)
//                            ->resize('220', '270')
//                            ->save($path220 . $fileName);


                    $uploadimage = UploadImage::create(array(
                                'property_id' => $id,
                                'image' => $fileName,
                    ));
                    $property_data = UploadImage::where("property_id", $id)->get();
                    $imageUrl110 = asset('/profile_picture/270/') . '/' . $fileName;
                    $imageUrl50 = asset('/profile_picture/50/') . '/' . $fileName;
                    return view('admin.ajax-uploadImage', compact('property_data'));

                    echo json_encode(array('status' => 'success', 'profileimage' => $imageUrl110, 'headerimage' => $imageUrl50));
                } else {
                    
                }
            }
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store() {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        //
    }

}
