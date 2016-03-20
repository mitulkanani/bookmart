<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Requests\adminAddPropertyRequest;
use Illuminate\Http\Request;
use Session;
use App\User;
use App\Cms;
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

class CmsController extends Controller {

    public function __construct() {
        $this->middleware('auth.adminOnly');
        $this->userOBJ = new User();
        $this->propertyOBJ = new Property();
        $this->cmsOBJ = new Cms();
    }

    public function cms() {
        $cmsAll = $this->cmsOBJ->getCmsList();
        return view('admin.cms.cms', compact('cmsAll'));
    }

    public function addcms() {
        $cms=array();
        return view('admin.cms.addcms', compact('cms'));
    }

    public function saveCms() {
        $cmsId = Input::get('cms_id');
        $subject = e(Input::get('subject'));
        $slug = e(Input::get('slug'));
        $message = e(Input::get('texteditor'));
        $status = e(Input::get('status'));

        if ($cmsId > 0) {
            $cms = Cms::find($cmsId);
            $cms->slug = $slug;
            $cms->subject = $subject;
            $cms->message = $message;
            $cms->status = $status;
            $cms->save();
            if ($cms) {
                return Redirect::to("admin/cms")->with('success', 'Cms edited successfully');
            }
        } else {
            $cms = Cms::create(array(
                        'slug' => $slug,
                        'subject' => $subject,
                        'message' => $message,
                        'status' => $status,
            ));
            if ($cms) {
                return Redirect::to("admin/cms")->with('success', 'CMS added successfully');
            }
        }
    }

    public function editCms($cmsId) {
        $cms = Cms::find($cmsId);
        return view('admin.cms.addcms', compact('cms'));
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

    public function deleteCms($cms_id) {
        $cms = Cms::find($cms_id)->delete();
        return Redirect::to("admin/cms")->with('success', 'Cms deleted successfully');
    }
    
    public function getCmsDetails($CmsID) {
        $CmsData = Cms::where("id", $CmsID)->first();
        return view('admin.cms.cmsdetails', compact('CmsData'))->with('cmsOBJ', $this->cmsOBJ);
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
