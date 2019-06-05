import Web3 from "web3";
import { PatienceRegulationEngine } from '../contractInterfaces/PatienceRegulationEngine'
import { Effect, FetchNumber,FetchEthereumNumber, FetchNumberFields } from './common'
import EffectBase from './EffectBase'

export class PatienceRegulationEffects extends EffectBase {
	preInstance: PatienceRegulationEngine

	constructor(web3: Web3, instance: PatienceRegulationEngine) {
		super(web3)
		this.preInstance = instance
	}

	incubatingWeiDaiEffect(holder: string): Effect {
		return this.createEffect(async (account) => {
			const params: FetchNumberFields = {
				web3: this.web3,
				defaultValue: "unset",
				action: async (accounts) => await this.preInstance.getLockedWeiDai(accounts[0]).call({ from: accounts[1] }),
				accounts: [holder, account]
			}
			return await FetchEthereumNumber(params)
		})
	}

	currentPenalty(): Effect {
		return this.createEffect(async (account) => {
			const params: FetchNumberFields = {
				web3: this.web3,
				defaultValue: "unset",
				action: async (accounts) => await this.preInstance.getCurrentPenalty().call({ from: accounts[0] }),
				accounts: [account]
			}
			return await FetchNumber(params)
		})
	}

	lastAdjustmentBlock(): Effect {
		return this.createEffect(async (account) => {
			const params: FetchNumberFields = {
				web3: this.web3,
				defaultValue: "unset",
				action: async (accounts) => await this.preInstance.getLastAdjustmentBlockNumber().call({ from: accounts[0] }),
				accounts: [account]
			}
			return await FetchNumber(params)
		})
	}

}