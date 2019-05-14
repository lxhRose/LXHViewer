import { Template } from 'meteor/templating';
import { OHIF } from 'meteor/ohif:core';
import 'meteor/ohif:viewerbase';
import isMobile from './../../isMobile';

window.addEventListener('resize', function() {
    window.location.reload();
});

Template.toolbarSection.onCreated(() => {
    const instance = Template.instance();

    if (OHIF.uiSettings.leftSidebarOpen) {
        instance.data.state.set('leftSidebar', 'studies');
    }
});

Template.toolbarSection.helpers({
    leftSidebarToggleButtonData() {
        const instance = Template.instance();
        return {
            toggleable: true,
            key: 'leftSidebar',
            value: instance.data.state,
            options: [{
                value: 'studies',
                svgLink: 'packages/ohif_viewerbase/assets/icons.svg#icon-studies',
                svgWidth: 15,
                svgHeight: 13,
                bottomLabel: '序列'
            }]
        };
    },

    rightSidebarToggleButtonData() {
        const instance = Template.instance();
        return {
            toggleable: true,
            key: 'rightSidebar',
            value: instance.data.state,
            options: [{
                value: 'measurements',
                svgLink: '/packages/ohif_viewerbase/assets/icons.svg#icon-measurements-lesions',
                svgWidth: 18,
                svgHeight: 10,
                bottomLabel: '度量'
            }]
        };
    },

    toolbarButtons() {
        const extraTools = [];
        const buttonData = [];

        extraTools.push({
            id: 'magnify',
            title: '透镜',
            classes: 'imageViewerTool toolbarSectionButton',
            iconClasses: 'fa fa-circle'
        });

        extraTools.push({
            id: 'wwwcRegion',
            title: 'ROI 窗口',
            classes: 'imageViewerTool',
            iconClasses: 'fa fa-square'
        });

        extraTools.push({
            id: 'dragProbe',
            title: '探针',
            classes: 'imageViewerTool',
            iconClasses: 'fa fa-dot-circle-o'
        });

        extraTools.push({
            id: 'ellipticalRoi',
            title: '椭圆范围测量',
            classes: 'imageViewerTool',
            iconClasses: 'fa fa-circle-o'
        });

        extraTools.push({
            id: 'rectangleRoi',
            title: '矩形范围测量',
            classes: 'imageViewerTool',
            iconClasses: 'fa fa-square-o'
        });

        extraTools.push({
            id: 'invert',
            title: '反片',
            classes: 'imageViewerCommand',
            iconClasses: 'fa fa-adjust'
        });

        extraTools.push({
            id: 'rotateR',
            title: '向右旋转',
            classes: 'imageViewerCommand',
            svgLink: '/packages/ohif_viewerbase/assets/icons.svg#icon-tools-rotate-right'
        });

        extraTools.push({
            id: 'flipH',
            title: '水平翻转',
            classes: 'imageViewerCommand',
            svgLink: '/packages/ohif_viewerbase/assets/icons.svg#icon-tools-flip-horizontal'
        });

        extraTools.push({
            id: 'flipV',
            title: '垂直翻转',
            classes: 'imageViewerCommand',
            svgLink: '/packages/ohif_viewerbase/assets/icons.svg#icon-tools-flip-vertical'
        });

        extraTools.push({
            id: 'clearTools',
            title: '清除图像标注',
            classes: 'imageViewerCommand',
            iconClasses: 'fa fa-trash'
        });

        if (isMobile()) {
            extraTools.push({
                id: 'stackScroll',
                title: '图像滚动',
                classes: 'imageViewerTool',
                iconClasses: 'fa fa-bars'
            });
    
            extraTools.push({
                id: 'zoom',
                title: '缩放',
                classes: 'imageViewerTool',
                svgLink: 'packages/ohif_viewerbase/assets/icons.svg#icon-tools-zoom'
            });
    
            extraTools.push({
                id: 'wwwc',
                title: '调窗',
                classes: 'imageViewerTool',
                svgLink: 'packages/ohif_viewerbase/assets/icons.svg#icon-tools-levels'
            });
    
            extraTools.push({
                id: 'pan',
                title: '移动',
                classes: 'imageViewerTool',
                svgLink: 'packages/ohif_viewerbase/assets/icons.svg#icon-tools-pan'
            });
    
            extraTools.push({
                id: 'length',
                title: '直线距离',
                classes: 'imageViewerTool toolbarSectionButton',
                svgLink: 'packages/ohif_viewerbase/assets/icons.svg#icon-tools-measure-temp'
            });
    
            extraTools.push({
                id: 'annotate',
                title: '标注',
                classes: 'imageViewerTool',
                svgLink: 'packages/ohif_viewerbase/assets/icons.svg#icon-tools-measure-non-target'
            });
    
            extraTools.push({
                id: 'angle',
                title: '角度测量',
                classes: 'imageViewerTool',
                iconClasses: 'fa fa-angle-left'
            });
    
            extraTools.push({
                id: 'resetViewport',
                title: '重置',
                classes: 'imageViewerCommand',
                iconClasses: 'fa fa-undo'
            });

            extraTools.push({
                id: 'layout',
                title: '布局',
                iconClasses: 'fa fa-th-large',
                buttonTemplateName: 'layoutButton'
            });

            if (!OHIF.uiSettings.displayEchoUltrasoundWorkflow) {

                buttonData.push({
                    id: 'previousDisplaySet',
                    title: '向前',
                    classes: 'imageViewerCommand',
                    iconClasses: 'fa fa-toggle-up fa-fw'
                });
    
                buttonData.push({
                    id: 'nextDisplaySet',
                    title: '向后',
                    classes: 'imageViewerCommand',
                    iconClasses: 'fa fa-toggle-down fa-fw'
                });
    
                const { isPlaying } = OHIF.viewerbase.viewportUtils;
                buttonData.push({
                    id: 'toggleCinePlay',
                    title: () => isPlaying() ? '暂停' : '播放',
                    classes: 'imageViewerCommand',
                    iconClasses: () => ('fa fa-fw ' + (isPlaying() ? 'fa-stop' : 'fa-play')),
                    active: isPlaying
                });
            }

            buttonData.push({
                id: 'toggleMore',
                title: '更多',
                classes: 'rp-x-1 rm-l-3',
                svgLink: 'packages/ohif_viewerbase/assets/icons.svg#icon-tools-more',
                subTools: extraTools
            });
            
            return buttonData;
        }

        buttonData.push({
            id: 'stackScroll',
            title: '图像滚动',
            classes: 'imageViewerTool',
            iconClasses: 'fa fa-bars'
        });

        buttonData.push({
            id: 'zoom',
            title: '缩放',
            classes: 'imageViewerTool',
            svgLink: 'packages/ohif_viewerbase/assets/icons.svg#icon-tools-zoom'
        });

        buttonData.push({
            id: 'wwwc',
            title: '调窗',
            classes: 'imageViewerTool',
            svgLink: 'packages/ohif_viewerbase/assets/icons.svg#icon-tools-levels'
        });

        buttonData.push({
            id: 'pan',
            title: '移动',
            classes: 'imageViewerTool',
            svgLink: 'packages/ohif_viewerbase/assets/icons.svg#icon-tools-pan'
        });

        buttonData.push({
            id: 'length',
            title: '直线距离',
            classes: 'imageViewerTool toolbarSectionButton',
            svgLink: 'packages/ohif_viewerbase/assets/icons.svg#icon-tools-measure-temp'
        });

        buttonData.push({
            id: 'annotate',
            title: '标注',
            classes: 'imageViewerTool',
            svgLink: 'packages/ohif_viewerbase/assets/icons.svg#icon-tools-measure-non-target'
        });

        buttonData.push({
            id: 'angle',
            title: '角度测量',
            classes: 'imageViewerTool',
            iconClasses: 'fa fa-angle-left'
        });

        buttonData.push({
            id: 'resetViewport',
            title: '重置',
            classes: 'imageViewerCommand',
            iconClasses: 'fa fa-undo'
        });

        if (!OHIF.uiSettings.displayEchoUltrasoundWorkflow) {

            buttonData.push({
                id: 'previousDisplaySet',
                title: '向前',
                classes: 'imageViewerCommand',
                iconClasses: 'fa fa-toggle-up fa-fw'
            });

            buttonData.push({
                id: 'nextDisplaySet',
                title: '向后',
                classes: 'imageViewerCommand',
                iconClasses: 'fa fa-toggle-down fa-fw'
            });

            const { isPlaying } = OHIF.viewerbase.viewportUtils;
            buttonData.push({
                id: 'toggleCinePlay',
                title: () => isPlaying() ? '暂停' : '播放',
                classes: 'imageViewerCommand',
                iconClasses: () => ('fa fa-fw ' + (isPlaying() ? 'fa-stop' : 'fa-play')),
                active: isPlaying
            });

            // buttonData.push({
            //     id: 'toggleCineDialog',
            //     title: 'CINE',
            //     classes: 'imageViewerCommand',
            //     iconClasses: 'fa fa-youtube-play',
            //     active: () => $('#cineDialog').is(':visible')
            // });
        }

        buttonData.push({
            id: 'layout',
            title: '布局',
            iconClasses: 'fa fa-th-large',
            buttonTemplateName: 'layoutButton'
        });

        buttonData.push({
            id: 'toggleMore',
            title: '更多',
            classes: 'rp-x-1 rm-l-3',
            svgLink: 'packages/ohif_viewerbase/assets/icons.svg#icon-tools-more',
            subTools: extraTools
        });

        return buttonData;
    },

    hangingProtocolButtons() {
        let buttonData = [];

        buttonData.push({
            id: 'previousPresentationGroup',
            title: 'Prev. Stage',
            iconClasses: 'fa fa-step-backward',
            buttonTemplateName: 'previousPresentationGroupButton'
        });

        buttonData.push({
            id: 'nextPresentationGroup',
            title: 'Next Stage',
            iconClasses: 'fa fa-step-forward',
            buttonTemplateName: 'nextPresentationGroupButton'
        });

        return buttonData;
    }

});

Template.toolbarSection.onRendered(function() {
    const instance = Template.instance();

    instance.$('#layout').dropdown();

    // Set disabled/enabled tool buttons that are set in toolManager
    const states = OHIF.viewerbase.toolManager.getToolDefaultStates();
    const disabledToolButtons = states.disabledToolButtons;
    const allToolbarButtons = $('#toolbar').find('button');
    if (disabledToolButtons && disabledToolButtons.length > 0) {
        for (let i = 0; i < allToolbarButtons.length; i++) {
            const toolbarButton = allToolbarButtons[i];
            $(toolbarButton).prop('disabled', false);

            const index = disabledToolButtons.indexOf($(toolbarButton).attr('id'));
            if (index !== -1) {
                $(toolbarButton).prop('disabled', true);
            }
        }
    }
});
