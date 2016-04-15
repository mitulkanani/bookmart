<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class adminAddProductRequest extends Request {

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
            'ad_title' => 'required',
            'owner_name' => 'required',
            'mobileno' => 'required',
            'description' => 'required',
            'price' => 'required|min:2|numeric',
        ];
    }

}
