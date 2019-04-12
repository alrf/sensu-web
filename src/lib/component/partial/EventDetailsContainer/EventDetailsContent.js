import React from "/vendor/react";
import PropTypes from "prop-types";
import gql from "/vendor/graphql-tag";
import { Grid } from "/vendor/@material-ui/core";

import { Content, Loader } from "/lib/component/base";

import RelatedEntitiesCard from "/lib/component/partial/RelatedEntitiesCard";

import CheckResult from "./EventDetailsCheckSummary";
import Toolbar from "./EventDetailsToolbar";
import EntitySummary from "./EventDetailsEntitySummary";

class EventDetailsContainer extends React.Component {
  static propTypes = {
    event: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    refetch: PropTypes.func,
  };

  static defaultProps = {
    event: null,
    refetch: () => null,
  };

  static fragments = {
    event: gql`
      fragment EventDetailsContainer_event on Event {
        id
        timestamp
        deleted @client
        ...EventDetailsToolbar_event
        ...EventDetailsCheckSummary_event

        check {
          ...EventDetailsCheckSummary_check
        }
        entity {
          ...EventDetailsCheckSummary_entity
          ...RelatedEntitiesCard_entity
          ...EventDetailsEntitySummary_entity
        }
      }

      ${CheckResult.fragments.event}
      ${CheckResult.fragments.check}
      ${CheckResult.fragments.entity}
      ${RelatedEntitiesCard.fragments.entity}
      ${EntitySummary.fragments.entity}
      ${Toolbar.fragments.event}
    `,
  };

  render() {
    const { event, loading, refetch } = this.props;

    return (
      <Loader loading={loading} passthrough>
        {event && (
          <React.Fragment>
            <Content marginBottom>
              <Toolbar event={event} refetch={refetch} />
            </Content>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <CheckResult
                  event={event}
                  check={event.check}
                  entity={event.entity}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <RelatedEntitiesCard entity={event.entity} />
              </Grid>
              <Grid item xs={12} md={7}>
                <EntitySummary entity={event.entity} />
              </Grid>
            </Grid>
          </React.Fragment>
        )}
      </Loader>
    );
  }
}

export default EventDetailsContainer;
