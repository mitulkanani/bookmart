/*var load_more_obj_page = 2;*/

function initialize() {
  var input = (document.getElementById('question_location'));

  var autocomplete = new google.maps.places.Autocomplete(input);
 
  google.maps.event.addListener(autocomplete, 'place_changed', function() {

    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    if (place.address_components) {
	    for (i = 0; i < place.address_components.length; i++) {
                
	    	if(place.address_components[i].types[0] == 'neighborhood'){
	    		$('#question_neighborhood').val(place.address_components[i].long_name);
	    	}
	    	if(place.address_components[i].types[0] == 'street_number'){
	    		$('#question_street_number').val(place.address_components[i].long_name);
	    	}
	    	if(place.address_components[i].types[0] == 'route'){
	    		$('#question_street').val(place.address_components[i].long_name);
	    	}
	    	if(place.address_components[i].types[0] == 'locality'){
	    		$('#question_city').val(place.address_components[i].long_name);
	    	}
	    	if(place.address_components[i].types[0] == 'administrative_area_level_1'){
	    		$('#question_state').val(place.address_components[i].short_name);
	    	}
	    	if(place.address_components[i].types[0] == 'postal_code'){
	    		$('#question_zip').val(place.address_components[i].long_name);
	    	}else
                {
                    $('#question_zip').val("");
                }
                if(place.address_components[i].types[0] == 'country'){
	    		$('#question_country').val(place.address_components[i].long_name);
	    	}
            }
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

$( "#user_type" ).change(function() {
  $(".pcustomfield").hide();
  var selected = $(this).val();
  
  if(selected == 1){
	  $(".pstudent").show();
  }
  if(selected == 2){
	  $(".pparent").show();
  }
  if(selected == 3){
	  $(".pexpert").show();
  }

});

selectedUserType($("#user_type").val());
function selectedUserType(selectedValue)
{
    $(".pcustomfield").hide();
    var selected = selectedValue;

    if(selected == 1){
            $(".pstudent").show();
    }
    if(selected == 2){
            $(".pparent").show();
    }
    if(selected == 3){
            $(".pexpert").show();
    }
}

function skipQuestion(question_id)
{
     var $_token = $('#token').val();
    
     if(confirm("Are you sure you want to skip this question?"))
     {
        $.ajax({
            type: 'POST',
            url: baseURL+"skipQuestion",
            headers: {'X-XSRF-TOKEN': $_token},
            data: {'question_id' :question_id},
            success: function(data) {
              //  $(".ajax_answer_ul").html("");
              $('#skip-question-id-'+question_id).remove();
              if($('div.col-xs-12').length <= 1)
              {
                  $('#noQuestionAvailable').show();              
              }
              
            }
        });
    }
}
function editAnswer(answer_id,question_id)
{
    var answer_value = $('#editAnswerLink-'+answer_id).data('answervalue');       
    var textAreaHtml = '<li class="comment-form"><div class="input-group"><span class="input-group-addon"><i class="fa fa-comment"></i></span><textarea style="height:35px;resize:none;" rows="1" id="editText-'+answer_id+'" class="form-control"  placeholder="Type your answer here">'+answer_value+'</textarea><span class="input-group-btn"><button onclick="updateAnswer('+answer_id+','+question_id+')" class="btn btn-inverse" type="button">Answer</button></span></div></li>';
    $('#editAnswerLink-'+answer_id).hide();
    $('#editAnswerBox-'+answer_id).html(textAreaHtml);
}
function updateAnswer(answer_id,question_id)
{
    var answerText = $('#editText-'+answer_id).val();
    var $_token = $('#token').val();
    

    $.ajax({
            type: 'POST',
            url: baseURL+"updateAnswer",
            headers: {'X-XSRF-TOKEN': $_token},
            data: {'answer_id' :answer_id,'answerText':answerText},
            success: function(data) {
              //  $(".ajax_answer_ul").html("");
               $('#editAnswerBox-'+answer_id).hide();
               $('#editAnswerLink-'+answer_id).show();
               getAnswerData(question_id);
            }
    });
}
/* Function for Facebook share and save data */
window.fbAsyncInit = function() {
        FB.init({
          appId      : '439429642900962',
          xfbml      : true,
          version    : 'v2.3'
        });
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
	   
		function shareFacebook(answerid,questionid)
		{			
			var answer = $('#facebook_share-'+answerid).attr('data-answer-facebook');
			var question = $('#facebook_share-'+answerid).attr('data-question-facebook');

			var obj = {method: 'feed',link: baseURL,name: question,description: answer};
				function callback(response){
					if(response){						
						saveFacebookShareData(answerid,questionid);					
					}
				}
		FB.ui(obj, callback);
		}

function saveFacebookShareData(answerid,questionid){
	var $_token = $('#token').val();
	var URL = baseURL+'saveFacebookShareData';
	$.ajax({
           type:'POST',
           url: URL,
	       headers: { 'X-XSRF-TOKEN' : $_token }, 
           data: {action:'savesharedata',answerid:answerid,questionid:questionid},
           success: function (data) {    
           }
    });
}
/* Function for Facebook share and save data */

/* Function for make question Favourite */
function makeQuestionFavourite(questionid)
{
	var $_token = $('#token').val();
 	$.ajax({
           type: 'POST',
           url: baseURL+'makeQuestionFavourite',
           headers: {'X-XSRF-TOKEN': $_token},
           data: {questionid:questionid},
           success: function(data) {
           	if(data == "success")
			{
				$('#favouritecustom-'+questionid).removeClass('fa-heart-o');
				$('#favouritecustom-'+questionid).addClass('fa-heart');
				$("#favolink-"+questionid).prop("onclick", null);
			}
              
           }
       });
}
/* Function for make question Favourite */


/* Function for vote question's answer */
function upVoteAnswer(answerid)
{
	var $_token = $('#token').val();
 	$.ajax({
           type: 'POST',
           url: baseURL+'upVoteAnswer',
           headers: {'X-XSRF-TOKEN': $_token},
           data: {answerid:answerid},
           success: function(data) {
           	if(data == "success")
			{
				$('#votedown_'+answerid).removeClass('fa-thumbs-up');
				$('#votedown_'+answerid).addClass('fa-thumbs-down');
				$('#votelink_'+answerid).attr("onclick", "downVoteAnswer("+answerid+")");
				$('#buttontext_'+answerid).html("UnHelpful");
				var votecount =  $('#answer_vote_count_'+answerid).html();
				$('#answer_vote_count_'+answerid).html(parseInt(votecount)+1);
			}
           }
       });
}

function downVoteAnswer(answerid)
{
	var $_token = $('#token').val();
 	$.ajax({
           type: 'POST',
           url: baseURL+'downVoteAnswer',
           headers: {'X-XSRF-TOKEN': $_token},
           data: {answerid:answerid},
           success: function(data) {
           	if(data == "success")
			{
				$('#votedown_'+answerid).removeClass('fa-thumbs-down');
				$('#votedown_'+answerid).addClass('fa-thumbs-up');
				$('#votelink_'+answerid).attr("onclick", "upVoteAnswer("+answerid+")");
				$('#buttontext_'+answerid).html("Helpful");
				var votecount =  $('#answer_vote_count_'+answerid).html();
				$('#answer_vote_count_'+answerid).html(parseInt(votecount)-1);
			}
           }
       });
}
/* Function for vote question's answer */

/* Function for report bad question,answer and answer comment */
function reportToAdmin(dataid,type,updateid,commentquestionid)
{
 	var $_token = $('#token').val();
    
     if(confirm("Are you sure you want to flag this "+type+" ?"))
     {
        $.ajax({
            type: 'POST',
            url: baseURL+"reportAdmin",
            headers: {'X-XSRF-TOKEN': $_token},
            data: {'dataid' :dataid,'type':type,'updateid':updateid},
            success: function(data) {
                $("#report_data_msg").show();
                $("#report_data_msg").html("Success, Admin will review it and take appropriate decision");
                $("#report_data_msg").delay(5000).fadeOut(400);
				if(type == 'question')
				{
                                        $('#question-flag-link-'+dataid).attr('style','color:#FF6600');
					//$('#question-flag-link-'+dataid).hide();	
				}
				else if(type == 'answer')
				{
					//$('#answer-flag-link-'+dataid).hide();
                                        $('#answer-flag-link-'+dataid).attr('style','color:#FF6600');	
					if(isView){
					getAnswerData(updateid,isView);
					}else{
						getAnswerData(updateid);
					}
				}
				else{
					//$('#comment-flag-link-'+dataid).hide();
                                        $('#comment-flag-link-'+dataid).attr('style','color:#FF6600');	
					getAnswerData(commentquestionid,isView);
				}
              	if(isadminapprovalnecessary == '0')
				{
              		if(type == 'question')
					{
              			$('#skip-question-id-'+dataid).remove();	
              		}
					else if(type == 'answer')
					{
              			$('#report-answer-'+dataid).remove();	
              			var topanswercount = $('#topbox-answer-count-'+updateid).html();
						$('#topbox-answer-count-'+updateid).html(parseInt(topanswercount)-1);	
              		}
					else{
						$('#commentSection-'+dataid).remove();
					}              		
              	}
				
              if($('div.col-xs-12').length <= 1)
              {
                  $('#noQuestionAvailable').show();              
              }
              
            }
        });
    }	
}
function banUser(questionId)
{
    
    var $_token = $('#token').val();
    $.ajax({
           type: 'POST',
           url: baseURL+'admin/banuser',
           headers: {'X-XSRF-TOKEN': $_token},
           data: {questionId:questionId},
           success: function(data) {
               window.location.reload();
           }
       });
}
function doVerifedUser(userId)
{
    var $_token = $('#token').val();
    $.ajax({
           type: 'POST',
           url: baseURL+'admin/doVerified',
           headers: {'X-XSRF-TOKEN': $_token},
           data: {userId:userId},
           success: function(data) {
                $("#report_data_msg").show();
                if(data==1)
                {
                    $("#report_data_msg").html("Success, User verified successfully");
                }
                else
                {
                    $("#report_data_msg").html("Success, User unverified successfully");
                }
                $("#report_data_msg").delay(5000).fadeOut(400);
           }
       });
}
