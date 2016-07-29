<?php
/**
 * @package WP_Lbb_Social
 * @version 1.0
 */
/*
Plugin Name: WP Lbb Social
Plugin URI: http://wordpress.org/plugins/hello-dolly/
Description: This plugin is used for signle page hooks for hitting urls.
Author: Little Black Book(Jitendra Bansal)
Version: 1.0
*/

//Adding menu to admin panel
if ( is_admin() ){
	add_action( 'admin_menu', 'wp_lbb_social_admin_menu' );
}

//Hook to add menu in admin panel
function wp_lbb_social_admin_menu() {
	add_options_page('Wp Lbb Social','Wp Lbb Social','manage_options','wp-lbb-social-options','wp_lbb_social_settings_page' );
}

//Register styles
function wp_lbb_social_admin_style() {
	if(!$pulgin_versions){
		$pulgin_versions = "1.2";
	}
?>

	<script >

	if(window.location.hash.indexOf('#!') == -1 ){
	    window.location.hash = '#!/';
	}
	</script>

  <!--Application JavaScript Files-->
  <link rel='stylesheet' href="<?php echo ( plugins_url( 'public/modules/reactions/css/reactions.css', __FILE__ ) ) ?>" type='text/css' media='all' >
<?php
  /* Library */
	wp_enqueue_script("angular.js", plugins_url( 'public/lib/angular/angular.js',__FILE__), array(), $pulgin_versions);
	wp_enqueue_script("angular-resource.js", plugins_url( 'public/lib/angular-resource/angular-resource.js', __FILE__ ), array(), $pulgin_versions);
	wp_enqueue_script("angular-cookies.min.js", plugins_url( 'public/lib/bower-angular-cookies-master/angular-cookies.min.js', __FILE__ ), array(), $pulgin_versions);
	wp_enqueue_script("angular-animate.js", plugins_url( 'public/lib/angular-animate/angular-animate.js', __FILE__ ), array(), $pulgin_versions);
	wp_enqueue_script("angular-ui-router.js", plugins_url( 'public/lib/angular-ui-router/release/angular-ui-router.js', __FILE__ ), array(), $pulgin_versions);
	wp_enqueue_script("angular-ui-router.js", plugins_url( 'public/lib/angular-ui-router/release/angular-ui-router.js', __FILE__ ), array(), $pulgin_versions);
	wp_enqueue_script("ui-utils.js", plugins_url( 'public/lib/angular-ui-utils/ui-utils.js', __FILE__ ), array(), $pulgin_versions);
	wp_enqueue_script("ui-bootstrap-tpls.js", plugins_url( 'public/lib/angular-bootstrap/ui-bootstrap-tpls.js', __FILE__ ), array(), $pulgin_versions);
	wp_enqueue_script("bootstrap.min.js", plugins_url( 'public/lib/bootstrap/dist/js/bootstrap.min.js', __FILE__ ), array(), $pulgin_versions);
	wp_enqueue_script("angular-sanitize.min.js", plugins_url( 'public/lib/angular-sanitize/angular-sanitize.min.js', __FILE__ ), array(), $pulgin_versions);
	wp_enqueue_script("config.js", plugins_url( 'public/config.js', __FILE__ ), array(), $pulgin_versions);
	wp_enqueue_script("application.js", plugins_url( 'public/application.js', __FILE__ ), array(), $pulgin_versions);

	/*  Login */
	wp_enqueue_script("users.client.module.js", plugins_url( 'public/modules/users/users.client.module.js', __FILE__ ), array(), $pulgin_versions);
	wp_enqueue_script("users.client.config.js", plugins_url( 'public/modules/users/config/users.client.config.js', __FILE__ ), array(), $pulgin_versions);
	wp_enqueue_script("users.client.routes.js", plugins_url( 'public/modules/users/config/users.client.routes.js', __FILE__ ), array(), $pulgin_versions);
	wp_enqueue_script("authentication.client.controller.js", plugins_url( 'public/modules/users/controllers/authentication.client.controller.js', __FILE__ ), array(), $pulgin_versions);
	wp_enqueue_script("authentication.client.service.js", plugins_url( 'public/modules/users/services/authentication.client.service.js', __FILE__ ), array(), $pulgin_versions);
	wp_enqueue_script("users.client.service.js", plugins_url( 'public/modules/users/services/users.client.service.js', __FILE__ ), array(), $pulgin_versions);

  /*  Reactions */
	wp_enqueue_script("reactions.client.module.js", plugins_url( 'public/modules/reactions/reactions.client.module.js', __FILE__ ), array(), $pulgin_versions);
	wp_enqueue_script("reactions.client.config.js", plugins_url( 'public/modules/reactions/config/reactions.client.config.js', __FILE__ ), array(), $pulgin_versions);
	wp_enqueue_script("reactions.client.routes.js", plugins_url( 'public/modules/reactions/config/reactions.client.routes.js', __FILE__ ), array(), $pulgin_versions);
	wp_enqueue_script("reactions.client.controller.js", plugins_url( 'public/modules/reactions/controllers/reactions.client.controller.js', __FILE__ ), array(), $pulgin_versions);
	wp_enqueue_script("reactions.client.service.js", plugins_url( 'public/modules/reactions/services/reactions.client.service.js', __FILE__ ), array(), $pulgin_versions);

  /*  Core */
	wp_enqueue_script("core.client.module.js", plugins_url( 'public/modules/core/core.client.module.js', __FILE__ ), array(), $pulgin_versions);
	wp_enqueue_script("core.client.routes.js", plugins_url( 'public/modules/core/config/core.client.routes.js', __FILE__ ), array(), $pulgin_versions);

}
add_action( 'wp_footer', 'wp_lbb_social_admin_style' );

//Register scripts
//Handle pages request
/*function wp_lbb_social_settings_page(){
	global $wpdb; // this is how you get access to the database
	?>
	<script type='text/javascript' src='<?php echo esc_url_raw( plugins_url( 'js/angular.min.js', __FILE__ )) ?>'></script>
	<?php
	$tab = $_GET["tab"];
  switch ($tab) {
    case "":
      include "view/wp_webhooks_list.php";
      break;
		case "delete-hook":
		  $id = $_GET["id"];
			$wpdb->delete( $wpdb->prefix."webhooks",
		                 array("id" => $id)
								   );
			echo "<script>window.location.href='?page=wp-webhooks-options'</script>";
			exit;
      break;
    default:
	}
	?>
	<!--<script type='text/javascript' src='<?php echo esc_url_raw( plugins_url( 'js/wp-webhooks-custom.js', __FILE__ )) ?>'></script>
  <script type='text/javascript' src='<?php echo esc_url_raw( plugins_url( 'js/jquery.validate-json.js', __FILE__ )) ?>'></script>-->


	<?php

}*/


function wp_lbb_social_icons_html(){
	$postId = get_the_ID();
	$post = get_post($postId);
	?>
	<div ng-controller="ReactionsController" ng-init="loadReactions()" ng-cloak>
		<div id="reaction-box" class="reaction-box desk-hide">
			<h3 class="cb-block-title">What's Your Take?</h3>
			<ul class="react-action border-box">
				<li>
					<a ng-repeat="(key, value) in allReaction" compile="popularReactions[value.name]">
						{{ popularReactions[value.name] }}
					</a>
					<!--<a><span id="all-reaction" class="all-reaction col-black">{{reactionTotal}}</span></a>-->
				</li>
				<li>
				<li>
					<div>
					  <a ng-if="!userReaction || (userReaction && !userReaction.reaction.length)" ng-click="openReactionsForm();" class="btn-addReaction">
							<span>React to this!</span>
					  </a>
					  <a ng-if="userReaction && userReaction.reaction.length" ng-click="openReactionsForm();" class="btn-coosenReaction">
							<span class="col-black" ng-if="userReaction.reaction.length == 1">{{userReactiontext}}</span>
							<span class="col-black" ng-if="userReaction.reaction.length > 1">{{userReaction.reaction.length}}</span>
							<span compile="userReactionTotal">{{userReactionTotal}}</span></i>
						</a>
					</div>
				</li>
			</ul>
			<?php /*<div id="sec-comments" class="sec-comments">
				<p>What did you love about this recommendation?</p>
			</div>
			<div id="react-error" class="react-error border-box">
				<i class="icon-lbb"></i>&nbsp;&nbsp;<span class="error-text">Report an error</span>
			</div>*/?>
		</div>

		<!-- step2 -->
		<div id="reaction-list" class="reaction-list desk-hide">
			<div class="tst_div" ng-click="openReactionsOverlayClose()"></div>
			<div class="reactions">
				<form method="{{method}}" action="#">
					<ul class="react-option">
						<li ng-repeat="reaction in reactionsIcons">
							<span>{{reaction.name}}</span>
							<input type='checkbox' ng-model="reaction.selected" value='{{reaction.value}}' id="{{reaction.value}}" ng-change="checkSeleted()"/>
							<span compile="reaction.icon">{{reaction.icon}}</span>
						</li>
					</ul>
					<ul id="reactBtn">
						<li class="close">
							<a ng-click="openReactionsFormClose();SubmitReactions($event,'close')" id="rect-list-close"><i class="smiles-Close"><span class="path1"></span><span class="path2"></span></i></a>
						</li>
						<li class="done">
							<a ng-click="SubmitReactions($event,'done')" id="rect-list-done"><i class="smiles-Tick"><span class="path1"></span><span class="path2"></span></i></a>
						</li>
					</ul>
				</form>
			</div>
		</div>
	</div>
	<?php
}
add_shortcode( 'wp_lbb_social_icons_htmlss', 'wp_lbb_social_icons_html' );

?>
