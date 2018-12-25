import {Component, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { storiesOf } from '@storybook/angular';
import { withCssResources } from '@storybook/addon-cssresources';
import { withKnobs, button, boolean, select, text } from '@storybook/addon-knobs';
import { McFormFieldModule, McButtonModule, McToolTipModule, McTooltip, McInputModule } from '@ptsecurity/mosaic';


@Component({
    selector: 'app',
    template: `
        <section class="container flex-100 layout-row layout-align-center-center">
            <div class="flex layout-row layout-align-center-center">
                <div class="flex layout-row layout-align-center-center container-item">
                    <span class="mc-title">Focus</span>
                    <button class="mc-primary container-item-child"
                            mc-button
                            color="primary"
                            mcTooltip
                            mcTitle="Удалить файл"
                            mcTrigger="focus"
                            mcPlacement="top">top
                    </button>
                    <button class="mc-primary container-item-child"
                            mc-button
                            mcTooltip="Подсказка может занимать две и более строк"
                            mcTrigger="focus"
                            mcPlacement="right"
                            color="primary"
                            [disabled]="disableTooltip"
                            [mcTooltipDisabled]="{{disableTooltip}}">disabled
                    </button>
                    <button class="mc-primary container-item-child"
                            mc-button
                            mcTooltip="PDQL-запрос фильтра содержит ошибки"
                            mcTrigger="focus"
                            mcPlacement="left">left
                    </button>
                    <button class="mc-primary container-item-child"
                            mc-button
                            mcTooltip="PDQL-запрос фильтра содержит ошибки. Uncaught SyntaxError: Unexpected string"
                            mcTrigger="focus"
                            mcPlacement="bottom">bottom
                    </button>
                </div>
            </div>
        </section>

    `,
    styles: [`
        .container {
            flex: 1 1 auto;
            height: 100%;
            width: 100%;
        }
        
        .container-item {
            height: 100%;
        }

        .container-item-child {
            margin: 10px 15px !important;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class TooltipDemoComponentFocus implements OnChanges{
    public disableTooltip: boolean = true;

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
    }
}

@Component({
    selector: 'app',
    template: `
        <section class="container flex-100 layout-row layout-align-center-center">
            <div class="flex layout-row layout-align-center-center">
                <div class="flex layout-column layout-align-center-center container-item">
                    <span class="mc-title">Hover</span>
                    <button class="mc-primary container-item-child"
                            mc-button
                            mcTooltip="Показать\\Скрыть"
                            mcPlacement="top">top
                    </button>
                    <button class="mc-primary container-item-child"
                            mc-button
                            mcTooltip="Активировать записи"
                            mcPlacement="right">right
                    </button>
                    <button class="mc-primary container-item-child"
                            mc-button
                            mcTooltip="PDQL-запрос фильтра содержит ошибки
                                испральве запрос"
                            mcPlacement="left">left
                    </button>
                    <button class="mc-primary container-item-child"
                            mc-button
                            mcTooltip="Обновить"
                            mcPlacement="bottom">bottom
                    </button>
                </div>
            </div>
        </section>
        
    `,
    styles: [`
        .container {
            flex: 1 1 auto;
            height: 100%;
            width: 100%;
        }
        
        .container-item {
            height: 100%;
        }

        .container-item-child {
            margin: 10px 15px !important;
        }

    `],
    encapsulation: ViewEncapsulation.None
})
export class TooltipDemoComponentHover {}

// @ts-ignore
@Component({
    selector: 'app',
    template: `
        <section class="container flex-100 layout-row layout-align-center-center">
            <div class="flex layout-row layout-align-center-center">
                <div class="flex-45 layout-column layout-align-center-center">
                    <div class="flex layout-padding-50">
                        <h3> Mouse over to </h3>
                        <button mc-button
                                (mouseenter)="tooltip.show()"
                                aria-label="Button that progamatically shows a tooltip on another button"
                                class="mc-button container-item-child">
                            show
                        </button> 
                        
                        <button mc-button
                                (mouseenter)="tooltip.hide()"
                                aria-label="Button that progamatically hides a tooltip on another button"
                                class="mc-button container-item-child">
                            hide
                        </button>
                    </div>

                    <button class="mc-button container-item-child"
                            mc-button 
                            #tooltip="mcTooltip"
                            color="primary"
                            mcTooltip
                            (click)="toggleTooltip(event)"
                            mcTitle="Info about the action"
                            mcTrigger="manual"
                            mcPlacement="bottom">
                        Click to toggle tooltip
                    </button>
                </div>
                <div class="flex-45 flex-column flex-offset-10">
                    <h3>Change placement</h3>
                    
                    <mc-form-field
                        #tooltipRef="mcTooltip"
                        mcTooltip
                        mcTitle="{{title}}"
                        mcTrigger="manual"
                        mcPlacement="{{tooltipPosition}}">
                        <input mcInput
                        class="mc-textarea_monospace"
                        [value]="'Some text...'"
                        />
                    </mc-form-field>
                </div>
            </div>
        </section>

    `,
    styles: [`
        .container {
            flex: 1 1 auto;
            height: 100%;
            width: 100%;
        }
        
        .container-item {
            height: 100%;
        }
        
        .container-item-child {
            margin: 10px 15px !important;
        }

    `],
    encapsulation: ViewEncapsulation.None
})
export class TooltipDemoComponentManualTrigger implements OnChanges{
    @ViewChild('tooltip') tooltip: McTooltip;
    @ViewChild('tooltipRef') tooltipRef: McTooltip;

    public triggerTooltip: boolean = false;
    public tooltipPosition: string = 'left';
    public title: string = 'Default text';
    constructor(){}

    public toggleTooltip(evt) {
        if (!this.tooltip.isTooltipOpen) {
            this.tooltip.show();
        } else {
            this.tooltip.hide();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('changes here', changes);
        if (changes.tooltipPosition) {
            this.tooltipPosition = changes.tooltipPosition.currentValue;
        }
        if (changes.title) {
            this.title = changes.title.currentValue;
        }
        this.toggleTooltipExternal(changes.triggerTooltip.currentValue);
    }

    private toggleTooltipExternal(flag) {
        if (flag) {
            this.tooltipRef.show();
        } else {
            this.tooltipRef.hide();
        }
    }
}

const cb = () => {
    console.log(this.TooltipDemoComponentManualTrigger);
    return this.TooltipDemoComponentManualTrigger.toggleTooltip(true);
};

storiesOf('Popups & Modals|Tooltip', module)
    .addDecorator(withKnobs)
    .addDecorator(withCssResources({
        cssresources: [
            {
                name: `Light Theme`,
                code: `<link rel="stylesheet" type="text/css" href="assets/css/default-theme.css"></link>`,
                picked: true,
            },
            {
                name: `Dark Theme`,
                code: `<link rel="stylesheet" type="text/css" href="assets/css/dark-theme.css"></link>`,
                picked: false,
            }
        ]
    }))
    .add('Tooltip on focus', () => ({
        component: TooltipDemoComponentFocus,
        props: {
            disableTooltip: boolean('mcTooltipDisabled', true)
        },
        moduleMetadata: {
            imports: [McButtonModule, McToolTipModule, FormsModule, McInputModule, McFormFieldModule]
        }
    }))
    .add('Tooltip on hover', () => ({
        component: TooltipDemoComponentHover,
        moduleMetadata: {
            imports: [McButtonModule, McToolTipModule, FormsModule, McInputModule, McFormFieldModule]
        }
    }))
    .add('Tooltip with manual trigger', () => ({
        component: TooltipDemoComponentManualTrigger,
        props: {
            triggerTooltip: boolean('Open tooltip for textarea', false),
            tooltipPosition: select(
                'Set placement',
                {
                    top: 'top',
                    left: 'left',
                    right: 'right',
                    bottom: 'bottom'
                }
            ),
            title: text("Tooltip text", 'Show some magic!')
        },
        moduleMetadata: {
            imports: [McButtonModule, McToolTipModule, FormsModule, McInputModule, McFormFieldModule]
        }
    }))
