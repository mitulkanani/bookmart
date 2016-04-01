<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class adminAddPropertyRequest extends Request {

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {
        return [
//
            'property_type' => 'required',
            'location' => 'required',
            'business_deal' => 'required',
            'status' => 'required',
            'description' => 'required',
            'price' => 'required|min:3|numeric',
            'area' => 'required|min:3|numeric',
        ];
    }

}
