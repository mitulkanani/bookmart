/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';

    config.filebrowserBrowseUrl = 'http://localhost:8081/newedge/public/ckeditor/kcfinder/browse.php?type=files';
    config.filebrowserImageBrowseUrl = 'http://localhost:8081/newedge/public/ckeditor/kcfinder/browse.php?type=images';
    config.filebrowserFlashBrowseUrl = 'http://localhost:8081/newedge/public/ckeditor/kcfinder/browse.php?type=flash';
    config.filebrowserUploadUrl = 'http://localhost:8081/newedge/public/kcfinder/upload.php?type=files';
    config.filebrowserImageUploadUrl = 'http://localhost:8081/newedge/public/ckeditor/kcfinder/upload.php?type=images';
    config.filebrowserFlashUploadUrl = 'http://localhost:8081/newedge/public/ckeditor/kcfinder/upload.php?type=flash';
};
