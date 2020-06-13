<?php

require_once('patreon/patreon.php');

use Patreon\API;
use Patreon\OAuth;

$refresh_token = file_get_contents('token.txt');

$client_id		= 'f596815333f920fd2810774da1e38028459c348df0335a8850d992eca9216bc7';
$client_secret	= '072872571e1861fa1b5129c136345029024590569a5de48708f377fea7b5f20e';
$creator_id		= '2384552';

$oauth_client	= new Patreon\OAuth($client_id, $client_secret);
$tokens			= $oauth_client->refresh_token($refresh_token, "");

$new_refresh_token = $tokens['refresh_token'];
$updated_file = 0;
if ($new_refresh_token != null) {
	file_put_contents(dirname(__FILE__) . '/token.txt', $new_refresh_token);
	$updated_file = 1;
}

$access_token = $tokens['access_token'];

$api_client = new Patreon\API($access_token);
$response = $api_client->fetch_campaign_and_patrons();

$total = round($response['data'][0]['attributes']['pledge_sum']/100);
$count = $response['data'][0]['attributes']['patron_count'];

echo json_encode(array('count' => $count, 'total' => $total, 'refresh' => $new_refresh_token, 'updated' => $updated_file));

?>