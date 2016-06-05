var obj = new Array();
var values = '';
$(document).ready(function() {
	$.get('mechs.github', function(jsonp) {    
		obj = $.parseJSON(jsonp);

		var names = new Array();
		for (i = 1; i <= Object.keys(obj).length; i++) {
			var name = obj[i].Name + " " + obj[i].Model + "|" + i
			names.push(name);
		}
			names.sort();
			var listItems = "<option value=\"0\">Select a Mech</option>";
		for (var i = 0; i < names.length; i++) {
			var values = names[i].split("|");
			listItems+= "<option value='" + values[1] + "'>" + values[0] + "</option>";
		}
		$("#selector").html(listItems);
	})

	$('#selector').change(function() {
		values = this.value
		var output = obj[values].Head_Armor + " " + obj[values].LA_Armor + " " + obj[values].LT_Armor + " " + obj[values].CT_Armor + " " + obj[values].RT_Armor + " " + obj[values].RA_Armor + " " + obj[values].LL_Armor + " " + obj[values].RL_Armor + "<br/>"
		console.log(obj[values]);
		$('span').html(output);
		$('#leftarmtext').html(laDamage + "/" + obj[values].LA_Armor);
		$('#lefttorsotext').html(ltDamage + "/" + obj[values].LT_Armor);
		$('#rightarmtext').html(raDamage + "/" + obj[values].RA_Armor);
	})
});

var headDamage = 0;
var laDamage = 0;
var ltDamage = 0;
var ctDamage = 0;
var rtDamage = 0;
var raDamage = 0;
var llDamage = 0;
var rlDamage = 0;

jQuery(function($){
  $('#centertorso').click(function(){
        ctDamage = fill('CT', obj[values].CT_Armor, ctDamage);
        this.style.fill = "url(#CT)";
    });
  $('#lefttorso').click(function(){
        ltDamage = fill('LT', obj[values].LT_Armor, ltDamage);
        this.style.fill = "url(#LT)";
        $('#lefttorsotext').html(ltDamage + "/" + obj[values].LT_Armor);
    });
  $('#righttorso').click(function(){
        rtDamage = fill('RT', obj[values].RT_Armor, rtDamage);
        this.style.fill = "url(#RT)";
    });
  $('#head').click(function(){
        headDamage = fill('Head', obj[values].Head_Armor, headDamage);
        this.style.fill = "url(#Head)";
    });
  $('#leftleg').click(function(){
        llDamage = fill('LL', obj[values].LL_Armor, llDamage);
        this.style.fill = "url(#LL)";
    });
  $('#rightleg').click(function(){
        rlDamage = fill('RL', obj[values].RL_Armor, rlDamage);
        this.style.fill = "url(#RL)";
    });
  $('#leftarm').click(function(){
        laDamage = fill('LA', obj[values].LA_Armor, laDamage);
        this.style.fill = "url(#LA)";
        $('#leftarmtext').html(laDamage + "/" + obj[values].LA_Armor);
    });
  $('#rightarm').click(function(){
        raDamage = fill('RA', obj[values].RA_Armor, raDamage, 'url(#RA)');
        this.style.fill = "url(#RA)";
        $('#rightarmtext').html(raDamage + "/" + obj[values].RA_Armor);
    });
});


function fill(name, partTotal, oldDamage, styleFill){
    var speed=15;
    var fill=oldDamage * 100 / partTotal;
    var newDamage = parseInt(prompt("Please enter new damage"), 10);
    var damage = newDamage + oldDamage;
    var percentage = damage * 100 / partTotal;
    var firstStop = document.getElementById(name + "1");
    if (percentage >= 100) {
        firstStop.setAttribute('stop-color','#000');
	var icon = setInterval(function() {
        fill += 1;
        fillstr = fill + '%';
        firstStop.setAttribute('offset',fillstr);
        if (fill >= percentage) {
          clearInterval(icon);
        }
      }, speed);
	if (percentage > 100) {
	  var extraDamage = damage - partTotal;
	  alert("extra damage " + extraDamage); 
	}
	damage = partTotal;
    } else if (percentage > 0) {
        firstStop.setAttribute('stop-color','#F00');
      var icon = setInterval(function() {
        fill += 1;
        fillstr = fill + '%';
        firstStop.setAttribute('offset',fillstr);
        if (fill >= percentage) {
          clearInterval(icon);
        }
      }, speed);
}
	return damage;
};
