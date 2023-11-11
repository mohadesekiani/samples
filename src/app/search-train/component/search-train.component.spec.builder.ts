import { BaseBuilder } from 'src/app/core/constant/base-unit-test/base-builder';
import { ISearchTrain } from '../../core/module/interface/search-types.interface';
import { SearchTrainComponent } from './search-train.component';
import { SearchTrainConst } from 'src/app/core/module/interface/search-train.spec.const';
import { TravelTrainTypesEnum } from 'src/app/core/module/enum/travel-types.enum';
import { GeneralTypesEnum } from 'src/app/core/module/enum/general-types.enum';
const sutConst = SearchTrainConst;

export class SearchTrainFormBuilder extends BaseBuilder<SearchTrainComponent> {
    override get some_data(): Partial<ISearchTrain> {
        return sutConst.SomeSearchTrain;
    }
    override get expected_default_form_value(): Partial<ISearchTrain> {
        return sutConst.SomeInvalidSearchTrain
    }
    override build(): SearchTrainComponent {
        const sut = new SearchTrainComponent(this.router);
        this.afterBuild(sut);

        return sut;
    }
}
