# custom-events

## custom click listener tag (all pages / page view)

    <script>
      (function() {
        var eventType = "click";
        if (document.addEventListener) { 
          document.addEventListener(eventType, {{Custom Click Handler}});
        } else if (document.attachEvent) { 
          document.attachEvent('on' + eventType, {{Custom Click Handler}}); 
        }
      })();
    </script>

## custom click handler variable

    function() {
      function findGTMTarget(node) {
        var current = node;
        while (current && !(current.dataset && current.dataset.gtm)) {
          current = current.parentNode;
        }
        return current || null;
      }
      
      return function(e) {
        var baseTarget = findGTMTarget(e.target);
        if (baseTarget === null) return ;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'f3app.'+e.type,
          'gtm.element': e.target,
          'gtm.elementClasses': e.target.className || '',
          'gtm.elementId': e.target.id || '',
          'gtm.elementTarget': e.target.target || '',
          'gtm.elementUrl': e.target.href || e.target.action || '',
          'gtm.baseTarget': baseTarget
        });
      }
    }

## custom click event trigger

    <Custom Event built-in>
    <All Custom Events>
    Event name: f3app.click

## tracked custom click tag

    <tag type = GA>
    <track type = Event>
    <on Custom click event>
    <category=...>
    <action=Tracked target action>
    <label=Tracked target label>
