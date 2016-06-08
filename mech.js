var obj = new Array();
var values = '';
$(document).ready(function () {
  $.get('mechs.github', function (jsonp) {
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
      listItems += "<option value='" + values[1] + "'>" + values[0] + "</option>";
    }
    $("#selector").html(listItems);
  })

  $('#selector').change(function () {
    values = this.value
    var output = obj[values].Head_Armor + " " + obj[values].LA_Armor + " " + obj[values].LT_Armor + " " + obj[values].CT_Armor + " " + obj[values].RT_Armor + " " + obj[values].RA_Armor + " " + obj[values].LL_Armor + " " + obj[values].RL_Armor + "<br/>"
    console.log(obj[values]);
    $('span').html(output);
    //      $('#leftarmtext').html(laDamage + "/" + obj[values].LA_Armor);
    //      $('#lefttorsotext').html(ltDamage + "/" + obj[values].LT_Armor);
    //      $('#rightarmtext').html(raDamage + "/" + obj[values].RA_Armor);
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
var rtrDamage = 0;
var ctrDamage = 0;
var ltrDamage = 0;

jQuery(function ($) {
  $('a[href="#damage"]').click(function () {
    var target = '';
    target = $(event.target);
    document.getElementById('msg').value = "";
    $(this).modal({
      fadeDuration: 250,
      showClose: false
    });
    // $(document).on("click", "#submit", function () {
      $("#submit").unbind().click(function() {
      event.preventDefault();
      $.modal.close()
      if (target.is('#head')) {
        headDamage = fill('headFill', obj[values].Head_Armor, headDamage);
        var element = document.getElementById('head')
        element.style.fill = "url(#headFill)";
      } else if (target.is('#leftleg')) {
          llDamage = fill('llFill', obj[values].LL_Armor, llDamage);
          var element = document.getElementById('leftleg')
          element.style.fill = "url(#llFill)";
      } else if (target.is('#rightleg')) {
          rlDamage = fill('rlFill', obj[values].RL_Armor, rlDamage);
          var element = document.getElementById('rightleg')
          element.style.fill = "url(#rlFill)";
      } else if (target.is('#leftarm')) {
          laDamage = fill('laFill', obj[values].LA_Armor, laDamage);
          var element = document.getElementById('leftarm')
          element.style.fill = "url(#laFill)";
      } else if (target.is('#rightarm')) {
          raDamage = fill('raFill', obj[values].RA_Armor, raDamage);
           var element = document.getElementById('rightarm')
          element.style.fill = "url(#raFill)";
        } else if (target.is('#centertorso')) {
          ctDamage = fill('ctFill', obj[values].CT_Armor, ctDamage);
          var element = document.getElementById('centertorso')
          element.style.fill = "url(#ctFill)";
        } else if (target.is('#lefttorso')) {
	  ltDamage = fill('ltFill', obj[values].LT_Armor, ltDamage);
       	  var element = document.getElementById('lefttorso')
       	  element.style.fill = "url(#ltFill)";
      } else if (target.is('#righttorso')) {
          rtDamage = fill('rtFill', obj[values].RT_Armor, rtDamage);
          var element = document.getElementById('righttorso')
          element.style.fill = "url(#rtFill)";
      } else if (target.is('#centertorsorear')) {
          ctDamage = fill('ctrFill', obj[values].CTR_Armor, ctrDamage);
          var element = document.getElementById('centertorsorear')
          element.style.fill = "url(#ctrFill)";
        } else if (target.is('#lefttorsorear')) {
          ltDamage = fill('ltrFill', obj[values].LTR_Armor, ltrDamage);
          var element = document.getElementById('lefttorsorear')
          element.style.fill = "url(#ltrFill)";
      } else if (target.is('#righttorsorear')) {
          rtDamage = fill('rtrFill', obj[values].RTR_Armor, rtrDamage);
          var element = document.getElementById('righttorsorear')
          element.style.fill = "url(#rtrFill)";
      };
    });
  });
});


function fill(name, partTotal, oldDamage) {
  var speed = 15;
  var fill = oldDamage * 100 / partTotal;
  var newDamage = parseInt($("#msg").val());
  var damage = newDamage + oldDamage;
  var percentage = damage * 100 / partTotal;
  var firstStop = document.getElementById(name + "1");
  if (percentage >= 100) {
    firstStop.setAttribute('stop-color', '#000');
    var icon = setInterval(function () {
      fill += 1;
      fillstr = fill + '%';
      firstStop.setAttribute('offset', fillstr);
      if (fill >= percentage) {
        clearInterval(icon);
      }
    }, speed);
    if (percentage > 100) {
      var extraDamage = damage - partTotal;
      alertModal("excess damage " + extraDamage);
    }
    damage = partTotal;
  } else if (percentage > 0) {
    firstStop.setAttribute('stop-color', '#F00');
    var icon = setInterval(function () {
      fill += 1;
      fillstr = fill + '%';
      firstStop.setAttribute('offset', fillstr);
      if (fill >= percentage) {
        clearInterval(icon);
      }
    }, speed);
  }
  return damage;
};

function alertModal(message) {
  // Get your modal markup from the DOM.
  var myModal = $('#myModal');

  // Inject your message somewhere into the modal.
  myModal.find('span.message').text(message);

  // Display the modal.
  myModal.modal();
}
