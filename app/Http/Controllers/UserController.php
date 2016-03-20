<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use Input;
use Illuminate\Support\Facades\Redirect;
use App\User;
use Auth;
use Session;
use Config;
use Image;
use File;
use Mail;
use Hash;

class UserController extends Controller {

    public function __construct() {
        $this->userOBJ = new User();
    }


}
