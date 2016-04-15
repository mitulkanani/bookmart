<?php
namespace App\Http\Controllers\Admin;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Validator;
use Input;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }
    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        //
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        //
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
    public function adminLogin()
    {
        
        if (Auth::check())
        {
            return Redirect::to("/admin/dashboard");
        }	
        return view('admin.signin');
    }
    public function loginCheck()
    {
        $username = e(Input::get('username'));
        $password = e(Input::get('password'));

        if (Auth::attempt(['username' => $username, 'password' => $password]))
        {
            return Redirect::to("/admin/dashboard");
        }

        return Redirect::back()
                        ->withInput()
                        ->withErrors('That username/password combo does not exist.');
    }
    public function getLogout()
    {
        Auth::logout();
        return Redirect::to('/admin');
    }
}