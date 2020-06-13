<?php

	date_default_timezone_set('Europe/London');

	function ShowDate($date) {
		$stf = 0;
		$cur_time = time();
		$diff = $cur_time - $date;
		$phrase = array('second','minute','hour','day','week','month','year','decade');
		$length = array(1,60,3600,86400,604800,2630880,31570560,315705600);
		for($i =sizeof($length)-1; ($i>=0) &&(($no = $diff/$length[$i])<=1); $i--); if($i<0) $i=0; $_time = $cur_time -($diff%$length[$i]);
		$no = floor($no); if($no) $phrase[$i] .='s'; $value=sprintf("%d %s ",$no,$phrase[$i]);
		if(($stf == 1) &&($i>= 1) &&(($cur_tm-$_time)>0)) $value .= time_ago($_time);
		return $value.' ago ';
	}

	require "twitteroauth/autoload.php";
	use Abraham\TwitterOAuth\TwitterOAuth;

	$hashtags = '#PixiJS';
	$connection = new TwitterOAuth('gQKSGVPGVigRiDi3tJrkQhWhT', 'epeDffwsKN1749rWA210CbCED9Rotf3tQ2ZZAtmKGrx4zBzmNu', '807046146-tNue5hbSuJycCesNfFpxWPOzWqX72TcXyxocMCR9', '1xzeQhNa00ZC3xrzdXhW8vZN6G0o1qA5CqHG7kFnN7q41');

	$statuses = $connection->get("search/tweets", array("q" => $hashtags.'-filter:retweets', "count" => 5));
	foreach ($statuses->statuses as $status) {
		$text = $status->text;
		
		$text = preg_replace("#(^|[\n ])([\w]+?://[\w]+[^ \"\n\r\t< ]*)#", "\\1<a href=\"\\2\" target=\"_blank\">\\2</a>", $text);
		$text = preg_replace("#(^|[\n ])((www|ftp)\.[^ \"\t\n\r< ]*)#", "\\1<a href=\"http://\\2\" target=\"_blank\">\\2</a>", $text);
		$text = preg_replace("/@(\w+)/", "<a href=\"http://www.twitter.com/\\1\" target=\"_blank\">@\\1</a>", $text);
		$text = preg_replace("/#(\w+)/", "<a href=\"http://www.twitter.com/#\\1\" target=\"_blank\">#\\1</a>", $text);

		$date = ShowDate(strtotime($status->created_at));

		echo '<li>';
		echo '<p>'.$status->user->screen_name.' <a href="http://twitter.com/'.$status->user->screen_name.'">@'.$status->user->screen_name.'</a> '.$date.'</p>';
		echo '<p>'.$text.'</p>';
		echo '</li>';
	}

?>