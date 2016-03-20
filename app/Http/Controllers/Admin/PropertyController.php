<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Requests\adminAddPropertyRequest;
use Illuminate\Http\Request;
use Session;
use App\User;
use App\Property;
use Input;
use Auth;
use Config;
use Redirect;
use Image;
use Validator;
use File;
use App\UploadImage;
use Response;
class PropertyController extends Controller {

    public function __construct() {
        $this->middleware('auth.adminOnly');
        $this->userOBJ = new User();
        $this->propertyOBJ = new Property();
    }

    public function property() {
        $properties = $this->propertyOBJ->getPropertyList();

        return view('admin.pages.property', compact('properties'));
    }

    public function addproperty() {
        $property_type = Config::get('config.property_types');
        $business_deal = Config::get('config.business_deal');

        $property = array();
        return view('admin.pages.addproperty', compact('property', 'property_type', 'business_deal'));
    }
	
	public function uploadImage($propertyId) {
        $property = UploadImage::where("property_id", $propertyId)->get();
		
        if ($property == null) {
            $property_data = array();
        } else {
            $property_data = UploadImage::where("property_id", $propertyId)->get();
        }
        return view('admin.pages.uploadimage')->with('propertyId', $propertyId)->with('property_data', $property_data);
    }

    public function editProperty($propertyId) {
        $property = Property::find($propertyId);
        $property_type = Config::get('config.property_types');
        $business_deal = Config::get('config.business_deal');
        return view('admin.pages.addproperty', compact('property', 'property_type', 'business_deal'));
    }

    public function saveProperty(adminAddPropertyRequest $request) {

        $property_id = Input::get('property_id');
        $property_type = e(Input::get('property_type'));
        $location = e(Input::get('location'));
        $business_deal = e(Input::get('business_deal'));
        $price = e(Input::get('price'));
        $area = e(Input::get('area'));
        $no_of_bedrooms = e(Input::get('no_of_bedrooms'));
        $description = e(Input::get('description'));
        $status = e(Input::get('status'));

        if ($property_id > 0) {
            $property = Property::find($property_id);
            $property->property_type = $property_type;
            $property->location = $location;
            $property->business_deal = $business_deal;
            $property->price = $price;
            $property->area = $area;
            $property->no_of_bedrooms = $no_of_bedrooms;
            $property->description = $description;
            $property->status = $status;
            $property->save();
            if ($property) {
                return Redirect::to("admin/property")->with('success', 'Property edited successfully');
            }
        } else {
            $property = Property::create(array(
                        'development_id' => 1,
                        'property_type' => $property_type,
                        'location' => $location,
                        'business_deal' => $business_deal,
                        'area' => $area,
                        'price' => $price,
                        'no_of_bedrooms' => $no_of_bedrooms,
                        'description' => $description,
                        'status' => $status,
            ));
            if ($property) {
                return Redirect::to("admin/property")->with('success', 'Property added successfully');
            }
        }
    }

    public function deleteProperty($property_id) {
        $property = Property::find($property_id)->delete();
        return Redirect::to("admin/property")->with('success', 'Property deleted successfully');
    }
    public function deleteImage() {
       $propertyid=Input::get('propertyid');
	   $DeleteImageid=Input::get('id');
	   $uploadimage = UploadImage::find($DeleteImageid)->delete();
	   
	   $property_data = UploadImage::where("property_id", $propertyid)->get();
	   return view('admin.pages.ajax-uploadImage', compact('property_data'));
       
    }

    public function getPropertyDetails($PropertyID) {
        $property_data = Property::where("id", $PropertyID)->first();
        return view('admin.pages.propertydetails', compact('property_data'))->with('propertyOBJ', $this->propertyOBJ);
    }

    public function imageSave($id) {
        
        $property_data = Property::where("id", $id)->first();
                
        $pathoriginal = base_path() . '/public/property_picture/original/';
//        $path110 = base_path() . '/property_picture/270/';
        $path50 = base_path() . '/public/property_picture/thumbnail/';
//        $path220 = base_path() . '/public/property_picture/220/';

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
                    //chmod($pathoriginal,0777);	
                    //chmod($path110,0777);	
                    //chmod($path50,0777);	

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
						return view('admin.pages.ajax-uploadImage', compact('property_data'));
        
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
