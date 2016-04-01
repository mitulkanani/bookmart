<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class PostAdRequest extends Request {

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
            'ad_title' => 'required|max:10',
            'author_name' => 'required',
            'price' => 'required|min:1|numeric',
            'cover_image' => 'required',
            'owner_name' => 'required|max:30',
            'mobileno' => 'required|max:20',
        ];
    }

}
