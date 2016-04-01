<?php namespace App\Http\Requests;

use App\Http\Requests\Request;

class UserProfileRequest extends Request {

	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		return [
			//
			'full_name'  => 'required',
            'email' => 'required|email|max:255',
            'username' => 'required|max:255|min:3|alpha_dash',
			'zip_code'=> 'required|min:5|numeric'
		
		];
	}

}
