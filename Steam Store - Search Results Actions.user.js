// ==UserScript==
// @name         Steam Store - Search Results Actions
// @icon         http://store.steampowered.com/favicon.ico
// @namespace    Royalgamer06
// @author       Royalgamer06
// @version      1.0.0
// @description  Add actions to steam store search results.
// @match        *://store.steampowered.com/search/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @updateURL    https://github.com/Royalgamer06/Steam-Store-Search-Results-Actions/raw/master/Steam%20Store%20-%20Search%20Results%20Actions.user.js
// @downloadURL  https://github.com/Royalgamer06/Steam-Store-Search-Results-Actions/raw/master/Steam%20Store%20-%20Search%20Results%20Actions.user.js
// ==/UserScript==

// ==Code==
this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(addButtons);

function addButtons() {
    const html = `<div class="block">
        <div class="block_header">
            <div>Results actions</div>
        </div>
        <div class="block_content block_content_inner">
            <a class="btnv6_blue_hoverfade btn_medium" data-store-tooltip="Add these products to your wishlist." style="width:100%;text-align:center;margin-bottom:3px;" id="btnWishlistResults">
                <span>Add to your wishlist</span>
            </a>
            <a class="btnv6_blue_hoverfade btn_medium" data-store-tooltip="Follow these products" style="width:100%;text-align:center;margin-bottom:3px;" id="btnFollowResults">
                <span>Follow</span>
            </a>
            <a class="btnv6_blue_hoverfade btn_medium" data-store-tooltip="Ignore these products" style="width:100%;text-align:center;margin-bottom:3px;" id="btnIgnoreResults">
                <span>Not interested</span>
            </a>
        </div>
    </div>`;
    $("#additional_search_options").prepend(html);
    $("#btnWishlistResults").click(wishlistResults);
    $("#btnFollowResults").click(followResults);
    $("#btnIgnoreResults").click(ignoreResults);
}

function wishlistResults() {
    doAction(this, "/recommended/ignorerecommendation/");
}

function followResults() {
    doAction(this, "/explore/followgame/");
}

function ignoreResults() {
    doAction(this, "/api/addtowishlist/");
}

function doAction(btn, action) {
    $(btn).prop("disabled", true).find("span").text("Loading...");
    const appids = $(".search_result_row[data-ds-appid]:not(:hidden)").get().map(e => parseInt($(e).data("ds-appid")));
    var ajaxDone = 0;
    appids.forEach(appid => {
        $.post(action, {
            sessionid: g_sessionID,
            appid: appid
        }, function() {
            ajaxDone++;
            if (ajaxDone === appids.length) {
                $(btn).find("span").text("Done");
            }
        });
    });
}
// ==/Code==
