<script>
import { Container, Aside, Main, Header } from 'element-ui'
import { startCase } from 'lodash'

export default {
  props: {
    sidebar: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      routes: [
        'BasicForm',
        'InlineValidatorsForm',
        'AsyncSubmitForm',
        'ImmediateForm',
        'SyncValidationForm',
        'AllValidationsForm',
        'ArrayFieldForm',
        'UploadForm',
        'DynamicValidatorsForm',
      ],
    }
  },

  computed: {
    routeName() {
      return this.$route.name
    },
  },

  render() {
    return (
      <Container direction="vertical" class="root-container">
        <Header class="header" height="80px">
          <pre class="title">@detools/vue-form</pre>
        </Header>
        <Container class="main-container">
          <Aside class="aside" width="250px">
            {this.routes.map(name => (
              <router-link class={['link', { link_active: name === this.routeName }]} to={{ name }}>
                {startCase(name)}
              </router-link>
            ))}
          </Aside>
          <Container direction="vertical">
            <Main class="main">
              <router-view />
            </Main>
          </Container>
        </Container>
      </Container>
    )
  },
}
</script>

<style scoped lang="less">
.root-container {
  min-height: 100%;
  padding-top: 80px;
  padding-left: 250px;
}

.header {
  height: 80px;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: #ffffff;
  z-index: 1;
}

.title {
  font-size: 40px;
  margin: 10px 0 0;
  font-weight: bold;
}

.main-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
}

.aside {
  position: fixed;
  width: 250px;
  top: 80px;
  left: 0;
  bottom: 0;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.main {
  padding: 10px 40px 40px;
}

.link {
  display: block;
  line-height: 40px;
  padding-left: 30px;
  position: relative;
  color: #0a0a0a;

  &_active {
    &:before {
      content: '☛';
      position: absolute;
      display: block;
      width: 10px;
      height: 10px;
      top: -3px;
      left: 5px;
      color: black;
      font-size: 20px;
    }
  }
}
</style>
