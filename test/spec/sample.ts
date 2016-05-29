import * as TypeMoq from 'typemoq';
import It = TypeMoq.It;
import GlobalMock = TypeMoq.GlobalMock;
import Times = TypeMoq.Times;
import GlobalScope = TypeMoq.GlobalScope;

function someGlobalFuncWithArgs(a:any, b:any, c:any):any {
  return 'someGlobalFuncWithArgs was called';
}
function someGlobalFunc() {
 return 'asdfsdfsdfsdfs !!!!!!1231231';
}

describe('SCORM API Wrapper', () => {

  let container:any;

  someGlobalFunc();

  beforeEach(() => {
    container = window;
  });

  describe('initially', () => {

    it('should check that global no args function is auto sandboxed', () => {

      var mock:any = GlobalMock.ofInstance(someGlobalFunc, null, container);

      mock.verify(x => x(), Times.never());

      GlobalScope.using(mock).with(() => {
console.log(container.someGlobalFunc);
        container.someGlobalFunc();
        container.someGlobalFunc();

        mock.verify(x => x(), Times.exactly(2));

      });

      container.someGlobalFunc();

      mock.verify(x => x(), Times.exactly(2));
    });

  });

});
