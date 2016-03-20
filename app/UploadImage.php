<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class UploadImage extends Model implements AuthenticatableContract {

    use Authenticatable;

    protected $table = 'upload_image';
    protected $fillable = ['id', 'property_id', 'image'];
    //
    

    public function getPropertyList() {
        $PropertyData = Property::select('property.*')
                        //->where('users.status',1)
                        ->orderBy('property.id', 'desc')->get();
        return $PropertyData;
    }

}
