<div class="show-hide-completed-setting">
    <!-- title -->
    <span id="completedVisualState" style="font-size: 14px; font-weight: 400; color:rgba(30, 30, 30, 0.69);"></span>
    <!-- wrapping within a label to enable the clicking of the span to trigger the checkbox as <label> automatically connects to the <input> inside of it -->
    <!-- this simplifies the process of connecting the <span> to the <input>, or else need to write mafan JavaScript code -->
    <label class="show-hide-completed-switch">
        <!-- hidden, to be used as the logic trigger -->
        <input type="checkbox" id="showHideCheckbox">
        <!-- the visible slider -->
        <span class="switch-slider"></span>
    </label>
</div>