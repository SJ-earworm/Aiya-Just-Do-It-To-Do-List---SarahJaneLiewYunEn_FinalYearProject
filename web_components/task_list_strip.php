<!-- template hides this entire thing, so it's rendered in the DOM for the other scripts to find this without having it appear upfront -->
<template id="listStrip">
    <div class="task-list-strip">
        <div class="task-list-li-thumb"></div>
        <div class="task-list-li">
            <input type="checkbox" class="task-checkbox">
            <span class="task-index"></span>
            <span class="task-name-strip">
                <span class="task-name"></span>
                <span class="ts-difficulty-priority-notation"></span>
                <div class="task-progress-indicator">
                    <div class="task-progress-indicator-blob"></div>
                    <span class="task-progress-indicator-text">doing</span>
                </div>
            </span>
        </div>
    </div>
</template>