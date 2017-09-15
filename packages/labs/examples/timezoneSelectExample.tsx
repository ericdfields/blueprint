/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */

import * as classNames from "classnames";
import * as React from "react";

import { Classes, Icon, Switch, Tag } from "@blueprintjs/core";
import { BaseExample, handleBooleanChange, handleStringChange } from "@blueprintjs/docs";

import { TimezoneDisplayFormat, TimezoneSelect } from "../src";

export interface ITimezoneSelectExampleState {
    date?: Date;
    defaultToLocalTimezone?: boolean;
    disabled?: boolean;
    showLocalTimezone?: boolean;
    targetDisplayFormat?: TimezoneDisplayFormat;
    timezone?: string;
    useDefault?: boolean;
}

const EXAMPLE_DEFAULT_TIMEZONE = "Pacific/Honolulu";

export class TimezoneSelectExample extends BaseExample<ITimezoneSelectExampleState> {
    public state: ITimezoneSelectExampleState = {
        date: new Date(),
        defaultToLocalTimezone: false,
        disabled: false,
        showLocalTimezone: true,
        targetDisplayFormat: TimezoneDisplayFormat.OFFSET,
        timezone: "",
        useDefault: false,
    };

    private handleDisabledChange = handleBooleanChange((disabled) => this.setState({ disabled }));
    private handleShowLocalTimezoneChange = handleBooleanChange((showLocalTimezone) =>
        this.setState({ showLocalTimezone }));
    private handleUseDefaultChange = handleBooleanChange((useDefault) => this.setState({ useDefault }));
    private handleDefaultToLocalTimezoneChange = handleBooleanChange((defaultToLocalTimezone) =>
        this.setState({ defaultToLocalTimezone }));
    private handleFormatChange = handleStringChange((targetDisplayFormat: TimezoneDisplayFormat) =>
        this.setState({ targetDisplayFormat }));

    protected renderExample() {
        const {
            date,
            timezone,
            targetDisplayFormat,
            disabled,
            showLocalTimezone,
            useDefault,
            defaultToLocalTimezone,
        } = this.state;

        return (
            <div>
                <TimezoneSelect
                    date={date}
                    value={timezone}
                    onChange={this.handleTimezoneChange}
                    targetDisplayFormat={targetDisplayFormat}
                    showLocalTimezone={showLocalTimezone}
                    disabled={disabled}
                    defaultValue={useDefault ? EXAMPLE_DEFAULT_TIMEZONE : undefined}
                    defaultToLocalTimezone={defaultToLocalTimezone}
                />

                <div style={{ marginTop: 20 }}>
                    <Tag
                        className={classNames(Classes.MINIMAL, Classes.LARGE)}
                        onRemove={this.handleTimezoneClear}
                    >
                        <Icon iconName="time" />
                        <span style={{ marginLeft: 10 }}>
                            {timezone ? timezone : "Select a timezone"}
                        </span>
                    </Tag>
                </div>
            </div>
        );
    }

    protected renderOptions() {
        return [
            [
                <Switch
                    checked={this.state.showLocalTimezone}
                    label="Show local timezone in initial list"
                    key="show-local-timezone"
                    onChange={this.handleShowLocalTimezoneChange}
                />,
                <Switch
                    checked={this.state.disabled}
                    label="Disabled"
                    key="disabled"
                    onChange={this.handleDisabledChange}
                />,
                this.renderDisplayFormatSelect(),
            ],
            [
                <Switch
                    checked={this.state.useDefault}
                    label={`Use ${EXAMPLE_DEFAULT_TIMEZONE} as the default timezone`}
                    key="use-default"
                    onChange={this.handleUseDefaultChange}
                />,
                <Switch
                    checked={this.state.defaultToLocalTimezone}
                    label="Default to the local timezone"
                    key="default-to-local-timezone"
                    onChange={this.handleDefaultToLocalTimezoneChange}
                />,
            ],
        ];
    }

    private renderDisplayFormatSelect() {
        return (
            <label key="display-format-select" className={Classes.LABEL}>
                Target display format
                <div className={Classes.SELECT}>
                    <select
                        value={this.state.targetDisplayFormat}
                        onChange={this.handleFormatChange}
                    >
                        <option value={TimezoneDisplayFormat.ABBREVIATION.toString()}>Abbreviation</option>
                        <option value={TimezoneDisplayFormat.NAME.toString()}>Name</option>
                        <option value={TimezoneDisplayFormat.OFFSET.toString()}>Offset</option>
                    </select>
                </div>
            </label>
        );
    }

    private handleTimezoneChange = (timezone: string) => {
        this.setState({ timezone });
    }

    private handleTimezoneClear = () => {
        this.setState({ timezone: "" });
    }
}